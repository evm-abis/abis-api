import { ChainId } from '../../chain/chain.enum';
import type { EtherscanApi } from '../interfaces/etherscan.interface';

const etherscanApiKey: string = process.env.ETHERSCAN_API_KEY ?? '';
const basescanApiKey: string = process.env.BASESCAN_API_KEY ?? '';
const polygonscanApiKey: string = process.env.POLYGONSCAN_API_KEY ?? '';
const optimismScanApiKey: string = process.env.OPTIMISMSCAN_API_KEY ?? '';
const arbiscanApiKey: string = process.env.ARBISCAN_API_KEY ?? '';
const bscscanApiKey: string = process.env.BSCSCAN_API_KEY ?? '';
const ftmscanApiKey: string = process.env.FTMSCAN_API_KEY ?? '';

/**
 * EtherScan API infos
 */
export const etherscanApi: Record<ChainId, EtherscanApi> = {
  [ChainId.ETH_MAINNET]: {
    apiHost: 'api.etherscan.io',
    apiKey: etherscanApiKey,
    homeHost: 'etherscan.io',
  },
  [ChainId.ETH_SEPOLIA]: {
    apiHost: 'api-sepolia.etherscan.io',
    apiKey: etherscanApiKey,
    homeHost: 'sepolia.etherscan.io',
  },
  [ChainId.ETH_GOERLI]: {
    apiHost: 'api-goerli.etherscan.io',
    apiKey: etherscanApiKey,
    homeHost: 'goerli.etherscan.io',
  },
  [ChainId.BASE_MAINNET]: {
    apiHost: 'api.basescan.org',
    apiKey: basescanApiKey,
    homeHost: 'basescan.io',
  },
  [ChainId.BASE_SEPOLIA]: {
    apiHost: 'api-sepolia.basescan.org',
    apiKey: basescanApiKey,
    homeHost: 'sepolia.basescan.io',
  },
  [ChainId.BASE_GOERLI]: {
    apiHost: 'api-goerli.basescan.org',
    apiKey: basescanApiKey,
    homeHost: 'goerli.basescan.io',
  },
  [ChainId.POLYGON_MAINNET]: {
    apiHost: 'api.polygonscan.com',
    apiKey: polygonscanApiKey,
    homeHost: 'polygonscan.com',
  },
  [ChainId.POLYGON_MUMBAI]: {
    apiHost: 'api-testnet.polygonscan.com',
    apiKey: polygonscanApiKey,
    homeHost: 'testnet.polygonscan.com',
  },
  [ChainId.POLYGON_ZKEVM_MAINNET]: {
    apiHost: 'api-zkevm.polygonscan.com',
    apiKey: polygonscanApiKey,
    homeHost: 'zkevm.polygonscan.com',
  },
  [ChainId.POLYGON_ZKEVM_TESTNET]: {
    apiHost: 'api-testnet-zkevm.polygonscan.com',
    apiKey: polygonscanApiKey,
    homeHost: 'testnet-zkevm.polygonscan.com',
  },
  [ChainId.OPTIMISM_MAINNET]: {
    apiHost: 'api-optimistic.etherscan.io',
    apiKey: optimismScanApiKey,
    homeHost: 'optimistic.etherscan.io',
  },
  [ChainId.OPTIMISM_SEPOLIA]: {
    apiHost: 'api-sepolia-optimistic.etherscan.io',
    apiKey: optimismScanApiKey,
    homeHost: 'sepolia-optimistic.etherscan.io',
  },
  [ChainId.ARBITRUM_ONE]: {
    apiHost: 'api.arbiscan.io',
    apiKey: arbiscanApiKey,
    homeHost: 'arbiscan.io',
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    apiHost: 'api-sepolia.arbiscan.io',
    apiKey: arbiscanApiKey,
    homeHost: 'sepolia.arbiscan.io',
  },
  [ChainId.ARBITRUM_NOVA]: {
    apiHost: 'api-nova.arbiscan.io',
    apiKey: arbiscanApiKey,
    homeHost: 'nova.arbiscan.io',
  },
  [ChainId.BSC_MAINNET]: {
    apiHost: 'api.bscscan.com',
    apiKey: bscscanApiKey,
    homeHost: 'bscscan.com',
  },
  [ChainId.BSC_TESTNET]: {
    apiHost: 'api-testnet.bscscan.com',
    apiKey: bscscanApiKey,
    homeHost: 'testnet.bscscan.com',
  },
  [ChainId.FTM_OPERA]: {
    apiHost: 'api.ftmscan.com',
    apiKey: ftmscanApiKey,
    homeHost: 'ftmscan.com',
  },
  [ChainId.FTM_TESTNET]: {
    apiHost: 'api-testnet.ftmscan.com',
    apiKey: ftmscanApiKey,
    homeHost: 'testnet.ftmscan.com',
  },
};
