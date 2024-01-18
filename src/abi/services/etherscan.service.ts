import type { Abi } from 'abitype';
import { Abi as AbiZod } from 'abitype/zod';
import type { ChainId } from '../../chain/chain.enum';
import { etherscanApi } from '../constants/etherscan.constant';
import type { EtherscanResponse } from '../interfaces/etherscan.interface';

/**
 * Get abi from etherscan
 */
export async function getAbiFromEtherScan(chainId: ChainId, contractAddress: string): Promise<Abi> {
  const host: string = etherscanApi[chainId].apiHost;
  const apiKey: string = etherscanApi[chainId].apiKey;
  const url: string = `https://${host}/api?apikey=${apiKey}&module=contract&action=getabi&address=${contractAddress}`;

  const response: Response = await fetch(url);
  const body = (await response.json()) as EtherscanResponse;

  if (body.status !== '1' && body.status !== 1) {
    throw new Error(`Can't find ${chainId} ABI for ${contractAddress}. Msg: ${JSON.stringify(body, null, 2)}`);
  }

  return AbiZod.parse(JSON.parse(body.result));
}

/**
 * Get abi source url from the given chainId and contractAddress
 */
export function getAbiFromEtherScanUrl(chainId: ChainId, contractAddress: string): string {
  const host: string = etherscanApi[chainId].homeHost;

  return `https://${host}/address/${contractAddress}#code`;
}
