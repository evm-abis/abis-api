import type { ChainId } from './chain.enum';

/**
 * Chain Interface
 */
export interface Chain {
  chainId: ChainId;
  name: string;
}
