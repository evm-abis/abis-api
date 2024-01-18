import { ChainId } from './chain.enum';

/**
 * Assert that the chainId is valid
 */
export function assertChainIdValid(chainId: ChainId): void {
  const chainExist = Object.values(ChainId).includes(chainId);

  if (!chainExist) {
    throw new Error(`Chain ${chainId} is not taken in charge`);
  }
}
