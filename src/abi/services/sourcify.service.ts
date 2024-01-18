import type { Abi } from 'abitype';
import { Abi as AbiZod } from 'abitype/zod';
import { getAddress } from 'viem';
import type { ChainId } from '../../chain/chain.enum';
import type { MetadataContent } from '../interfaces/sourcify.interface';

/**
 * Get abi from sourcify
 */
export async function getAbiFromSourcify(chainId: ChainId, contractAddress: string): Promise<Abi> {
  const checkSummedAddress = getAddress(contractAddress);
  const fullUrl: string = `https://repo.sourcify.dev/contracts/full_match/${chainId}/${checkSummedAddress}/metadata.json`;
  const partialUrl: string = `https://repo.sourcify.dev/contracts/partial_match/${chainId}/${checkSummedAddress}/metadata.json`;

  try {
    return await getAbiFromUrl(fullUrl);
  } catch {
    return await getAbiFromUrl(partialUrl);
  }
}

/**
 * Get abi from sourcify
 */
async function getAbiFromUrl(url: string): Promise<Abi> {
  const response: Response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch abi from https://sourcify.dev\n${response.statusText}`);
  }

  const body = (await response.json()) as MetadataContent;

  return AbiZod.parse(body.output.abi);
}
