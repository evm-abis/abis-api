import type { PackageJson } from '@npm/types';
import { Arborist } from '@npmcli/arborist';
import * as libpub from 'libnpmpublish';
import * as pacote from 'pacote';

const npmToken: string = process.env.NPM_TOKEN ?? '';

/**
 * Publish a package to npm
 */
export async function publishPackageToNpm(path: string): Promise<void> {
  const manifest: PackageJson = (await pacote.manifest(path)) as PackageJson;
  const tarData: Buffer & pacote.FetchResult = await pacote.tarball(path, {
    Arborist,
  });

  console.log(npmToken);

  try {
    // @See https://github.com/npm/cli/issues/4250#issuecomment-976602325
    await libpub.publish(manifest, tarData, {
      forceAuth: {
        token: npmToken,
      },
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}

/**
 * Is the package published to npm
 */
export async function isPackagePublished(packageName: string, version?: string): Promise<boolean> {
  try {
    await pacote.manifest(`${packageName}${version === undefined ? '' : `@${version}`}`);

    return true;
  } catch {
    return false;
  }
}

/**
 * Get the package url
 */
export function getPublishedPackageUrl(packageName: string, version?: string): string {
  return `https://registry.npmjs.org/${packageName}/-/${packageName.split('/')[1]}-${version}.tgz`;
}
