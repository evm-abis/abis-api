import { ChainId } from './chain.enum';
import type { Chain } from './chain.interface';

/**
 * Chains description
 */
export const chains: Record<ChainId, Chain> = {
  [ChainId.ETH_MAINNET]: {
    chainId: ChainId.ETH_MAINNET,
    name: 'Ethereum Mainnet',
  },
  [ChainId.ETH_SEPOLIA]: {
    chainId: ChainId.ETH_SEPOLIA,
    name: 'Ethereum Sepolia',
  },
  [ChainId.ETH_GOERLI]: {
    chainId: ChainId.ETH_GOERLI,
    name: 'Ethereum Goerli',
  },
  [ChainId.BASE_MAINNET]: {
    chainId: ChainId.BASE_MAINNET,
    name: 'Base Mainnet',
  },
  [ChainId.BASE_SEPOLIA]: {
    chainId: ChainId.BASE_SEPOLIA,
    name: 'Base Sepolia',
  },
  [ChainId.BASE_GOERLI]: {
    chainId: ChainId.BASE_GOERLI,
    name: 'Base Goerli',
  },
  [ChainId.POLYGON_MAINNET]: {
    chainId: ChainId.POLYGON_MAINNET,
    name: 'Polygon Mainnet',
  },
  [ChainId.POLYGON_MUMBAI]: {
    chainId: ChainId.POLYGON_MUMBAI,
    name: 'Polygon Mumbai',
  },
  [ChainId.POLYGON_ZKEVM_MAINNET]: {
    chainId: ChainId.POLYGON_ZKEVM_MAINNET,
    name: 'Polygon Zkevm Mainnet',
  },
  [ChainId.POLYGON_ZKEVM_TESTNET]: {
    chainId: ChainId.POLYGON_ZKEVM_TESTNET,
    name: 'Polygon Zkevm Testnet',
  },
  [ChainId.OPTIMISM_MAINNET]: {
    chainId: ChainId.OPTIMISM_MAINNET,
    name: 'Optimism Mainnet',
  },
  [ChainId.OPTIMISM_SEPOLIA]: {
    chainId: ChainId.OPTIMISM_SEPOLIA,
    name: 'Optimism Sepolia',
  },
  [ChainId.ARBITRUM_ONE]: {
    chainId: ChainId.ARBITRUM_ONE,
    name: 'Arbitrum One',
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    chainId: ChainId.ARBITRUM_SEPOLIA,
    name: 'Arbitrum Sepolia',
  },
  [ChainId.ARBITRUM_NOVA]: {
    chainId: ChainId.ARBITRUM_NOVA,
    name: 'Arbitrum Nova',
  },
  [ChainId.BSC_MAINNET]: {
    chainId: ChainId.BSC_MAINNET,
    name: 'BSC Mainnet',
  },
  [ChainId.BSC_TESTNET]: {
    chainId: ChainId.BSC_TESTNET,
    name: 'BSC Testnet',
  },
  [ChainId.FTM_OPERA]: {
    chainId: ChainId.FTM_OPERA,
    name: 'Fantom Opera',
  },
  [ChainId.FTM_TESTNET]: {
    chainId: ChainId.FTM_TESTNET,
    name: 'Fantom Testnet',
  },
};
