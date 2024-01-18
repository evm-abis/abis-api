# EVM ABI

## Why This Project?

Currently, obtaining a contract's ABI involves downloading it from Etherscan (or Sourcify) and manually pasting it into your project. Interacting with standard contracts like ERC20 requires either copying the ABI into your project or importing it from libraries like Wagmi. This presents 2 primary issues:

1. Lack of a dedicated package to centralize all ERC/EIP ABIs, independently of a library.
2. No straightforward method to import a contract's ABI into a project.

This project aims to address those problems by providing a simple way to import a contract's ABI into a project by providing the contract address.

There is already 2 tools that will download ABI and generate code by providing the contract adress.
- Eth-Sdk: https://github.com/dethcrypto/eth-sdk
- Wagmi Cli: https://wagmi.sh/cli/getting-started#add-contracts-and-plugins

But both or linked to an other library (respectively etherJS and Wagmi).

## API

As creating an npm package for every existing contract is impractical, we provide an API to generate these packages on demand. The API exposes three routes:

- `GET https://evm-abis.xyz/chains` to retrieve compatible chains.
- `GET https://evm-abis.xyz/:chainId/:contractAddress` to obtain the NPM package containing the ABI of a contract on a given chainId.
- `POST https://evm-abis.xyz/:chainId/:contractAddress` to retrieve information about the NPM package containing the ABI of a contract on a given chainId.
If an NPM package does not exist for a given contract, the API will create and publish it on npm.

We get the ABI from sourcify then from Etherscan if not available.

### Supported Chains
- Ethereum Mainnet
- Ethereum Sepolia
- Ethereum Goerli
- Base Mainnet
- Base Sepolia
- Base Goerli
- Polygon Mainnet
- Polygon Mumbai
- Polygon Zkevm Mainnet
- Polygon Zkevm Testnet
- Optimism Mainnet
- Optimism Sepolia
- Arbitrum One
- Arbitrum Sepolia
- Arbitrum Nova
- BSC Mainnet
- BSC Testnet
- Fantom Opera
- Fantom Testnet

### Importing Packages

#### By URL
```bash
# AAVE contract on mainnet (ChainId: 1)
npm install https://evm-abis.xyz/1/0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5/abi
```

This generates an entry in package.json:
```json
  "dependencies": {
    "@evm-abis/1-0x50327c6c5a14dcade707abad2e27eb517df87ab5-abi": "https://evm-abis.xyz/1/0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5/abi"
  }
```

You can also rename the package entry after adding it:
```json
  "dependencies": {
    "@evm-abis/mainnet-aave": "https://evm-abis.xyz/1/0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5/abi"
  }
```

#### By Package Name
To import by package name, first, obtain/create the package name using the `POST https://evm-abis.xyz/:chainId/:contractAddress` route:

```bash
  curl -X POST 'https://evm-abis.xyz/1/0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5'
```

Receive:
```json
  {
    "name": "@evm-abis/1-0x50327c6c5a14dcade707abad2e27eb517df87ab5-abi@1.0.3",
    "url": "https://registry.npmjs.org/@evm-abis/1-0x50327c6c5a14dcade707abad2e27eb517df87ab5-abi/-/1-0x50327c6c5a14dcade707abad2e27eb517df87ab5-abi-1.0.3.tgz"
  }
```

Then install the package:
```bash
  npm install @evm-abis/1-0x50327c6c5a14dcade707abad2e27eb517df87ab5-abi@1.0.3
```

This solution ensures dependency only on the npmjs registry, allowing for optimal use of caching systems.
