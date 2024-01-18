import type { Abi } from 'abitype';
import * as bun from 'bun';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as ts from 'typescript';

import { chains } from '../../chain/chain.constants';
import type { ChainId } from '../../chain/chain.enum';
import { getPublishedPackageUrl, isPackagePublished, publishPackageToNpm } from '../utils/npm.utils';

import { getAbiFromEtherScan, getAbiFromEtherScanUrl } from './etherscan.service';
import { getAbiFromSourcify } from './sourcify.service';

const tmpPath: string = process.env.TMP_PATH ?? '/tmp';

/**
 * Get a abi package stream for a given chainId and contractAddress
 */
export async function getAbiPackage(chainId: ChainId, contractAddress: string): Promise<{ name: string; url: string }> {
  const packageName: string = getPackageName(chainId, contractAddress);
  const packageVersion: string = getCurrentAbiPackageVersion();

  const packageExists: boolean = await isPackagePublished(packageName, packageVersion);

  if (!packageExists) {
    await createAbiPackage(chainId, contractAddress);
  }

  return {
    name: `${packageName}@${packageVersion}`,
    url: getPublishedPackageUrl(packageName, packageVersion),
  };
}

/**
 * Get a abi from sourcify and if not exist on etherscan
 */
async function getAbi(chainId: ChainId, contractAddress: string): Promise<Abi> {
  try {
    return await getAbiFromSourcify(chainId, contractAddress);
  } catch {
    return await getAbiFromEtherScan(chainId, contractAddress);
  }
}

/**
 * Create a package dir for a given chainId and contractAddress.
 */
async function createAbiPackage(chainId: ChainId, contractAddress: string): Promise<void> {
  const tmpPackagePath: string = path.join(tmpPath, getPackageName(chainId, contractAddress));
  const indexTsPath: string = path.join(tmpPackagePath, 'index.ts');
  const packageJsonPath: string = path.join(tmpPackagePath, 'package.json');
  const readmePath: string = path.join(tmpPackagePath, 'README.md');

  const abi: string = JSON.stringify(await getAbi(chainId, contractAddress), undefined, 2);

  // Create the package files
  bun.write(indexTsPath, await getIndexTs(abi));
  bun.write(packageJsonPath, await getPackageJSON(chainId, contractAddress));
  bun.write(readmePath, await getReadme(chainId, contractAddress, abi));

  // Compile the package
  ts.createProgram([indexTsPath], {
    noEmitOnError: true,
    noImplicitAny: true,
    declaration: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  }).emit();

  await publishPackageToNpm(tmpPackagePath);

  fs.rmSync(tmpPackagePath, { recursive: true });
}

/**
 * Get a index.ts content for a given chainId and contractAddress.
 */
async function getIndexTs(abi: string): Promise<string> {
  const templateFile: bun.BunFile = bun.file(path.join(import.meta.dir, 'template', 'index.txt'));
  let template: string = await templateFile.text();

  template = template.replaceAll('{{ABI}}', abi);

  return template;
}

/**
 * get a package.json content for a given contract address.
 */
async function getPackageJSON(chainId: ChainId, contractAddress: string): Promise<string> {
  const templateFile: bun.BunFile = bun.file(path.join(import.meta.dir, 'template', 'package.txt'));
  let template: string = await templateFile.text();

  template = template.replaceAll('{{CHAIN_NAME}}', chains[chainId].name);
  template = template.replaceAll('{{CHAIN_ID}}', chainId);
  template = template.replaceAll('{{CONTRACT_ADDRESS}}', contractAddress);
  template = template.replaceAll('{{ABI_SOURCE_URL}}', getAbiFromEtherScanUrl(chainId, contractAddress));
  template = template.replaceAll('{{VERSION}}', getCurrentAbiPackageVersion());

  return template;
}

/**
 * get a package.json content for a given contract address.
 */
async function getReadme(chainId: ChainId, contractAddress: string, abi: string): Promise<string> {
  const templateFile: bun.BunFile = bun.file(path.join(import.meta.dir, 'template', 'readme.txt'));
  let template: string = await templateFile.text();

  template = template.replaceAll('{{CHAIN_NAME}}', chains[chainId].name);
  template = template.replaceAll('{{CHAIN_ID}}', chainId);
  template = template.replaceAll('{{CONTRACT_ADDRESS}}', contractAddress);
  template = template.replaceAll('{{ABI_SOURCE_URL}}', getAbiFromEtherScanUrl(chainId, contractAddress));
  template = template.replaceAll('{{VERSION}}', getCurrentAbiPackageVersion());
  template = template.replaceAll('{{ABI}}', abi);

  return template;
}

/**
 * Get the package dir name
 */
function getPackageName(chainId: ChainId, contractAddress: string): string {
  return `@evm-abis/${chainId}-${contractAddress}-abi`;
}

/**
 * Get the current package version
 */
function getCurrentAbiPackageVersion(): string {
  return '1.0.5';
}
