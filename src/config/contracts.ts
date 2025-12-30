// Contract addresses - update after deployment
export const CONTRACTS = {
  // Mantle Sepolia Testnet
  sepolia: {
    chainId: 5003,
    usdc: "" as `0x${string}`, // MockUSDC address - update after deploy
    factory: "" as `0x${string}`, // ArisanFactory address - update after deploy
    yieldStrategy: "" as `0x${string}`, // AIYieldStrategy address - update after deploy
  },
  // Mantle Mainnet
  mainnet: {
    chainId: 5000,
    usdc: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9" as `0x${string}`, // Real USDC on Mantle
    factory: "" as `0x${string}`, // Update after mainnet deploy
    yieldStrategy: "" as `0x${string}`,
  },
} as const;

// Use testnet by default
export const ACTIVE_CHAIN = "sepolia" as keyof typeof CONTRACTS;
export const activeContracts = CONTRACTS[ACTIVE_CHAIN];
