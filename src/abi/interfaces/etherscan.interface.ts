/**
 * Etherscan API response
 */
export interface EtherscanResponse {
  status: string | number;
  message: string;
  result: string;
}

/**
 * Etherscan API
 */
export interface EtherscanApi {
  apiHost: string;
  apiKey: string;
  homeHost: string;
}
