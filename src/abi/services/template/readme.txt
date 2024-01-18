# ABI of contract {{CONTRACT_ADDRESS}} on {{CHAIN_NAME}}

- Chain: **{{CHAIN_NAME}}** ({{CHAIN_ID}})
- Contract Address: **{{CONTRACT_ADDRESS}}**
- Source: **{{ABI_SOURCE_URL}}**

## Importing Packages By URL
```bash
npm install https://evm-abis.xyz/{{CHAIN_ID}}/{{CONTRACT_ADDRESS}}
```

This generates an entry in package.json:
```json
  "dependencies": {
    "@evm-abis/{{CHAIN_ID}}-{{CONTRACT_ADDRESS}}": "https://evm-abis.xyz/{{CHAIN_ID}}/{{CONTRACT_ADDRESS}}"
  }
```

You can also rename the package entry after adding it:
```json
  "dependencies": {
    "@evm-abis/mainnet-aave": "https://evm-abis.xyz/{{CHAIN_ID}}/{{CONTRACT_ADDRESS}}"
  }
```

## Importing Packages By Package Name
To import by package name, first, obtain/create the package name using the `POST https://evm-abis.xyz/:chainId/:contractAddress` route:

```bash
  curl -X POST 'https://evm-abis.xyz/{{CHAIN_ID}}/{{CONTRACT_ADDRESS}}'
```

Receive:
```json
  {
    "name": "@evm-abis/{{CHAIN_ID}}-{{CONTRACT_ADDRESS}}@{{VERSION}}",
    "url": "https://registry.npmjs.org/@evm-abis/{{CHAIN_ID}}-{{CONTRACT_ADDRESS}}/-/{{CHAIN_ID}}-{{CONTRACT_ADDRESS}}-{{VERSION}}.tgz"
  }
```

Then install the package:
```bash
  npm install @evm-abis/{{CHAIN_ID}}-{{CONTRACT_ADDRESS}}@{{VERSION}}
```

This solution ensures dependency only on the npmjs registry, allowing for optimal use of caching systems.


## ABI Code
```json
{{ABI}}
```
