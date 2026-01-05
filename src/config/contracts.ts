// Contract addresses - update after deployment
export const CONTRACTS = {
  // Ethereum Sepolia Testnet (for hackathon demo)
  ethereumSepolia: {
    chainId: 11155111,
    // Core Contracts
    usdc: "0xdE8A1AA3d835cE7916eC4B3D5A925078Fd2Ed9eC" as `0x${string}`, // MockUSDC
    factory: "0xcF278B33083A8D50aD59C024bc4428725FBBb081" as `0x${string}`, // ArisanFactory
    yieldStrategy: "0xbc07e4cf8c72524B3c54E6451148b8b7cA5577e4" as `0x${string}`, // AIYieldStrategy
    // DeFi Protocol Vaults
    vaults: {
      lendle: "0x09Fe9d6fa54DDc36b1917C98231A0B12C8eC998D" as `0x${string}`,
      merchantMoe: "0xecaD7f7223Ed15Ff6d0D4DF4ED6696Acd1D29e0b" as `0x${string}`,
      agni: "0xf4a94E196e8aF8c5C25E4259d2244aCE7fBc2699" as `0x${string}`,
      minterest: "0x4beB15F866f59c3e4226d1a3aC63538e5d8005B3" as `0x${string}`,
      ktx: "0xcf79D60bbb1B57CA5F315760Fa46245551548d9D" as `0x${string}`,
    },
    // Sample Pools
    pools: {
      small: "0xFC8317C84800368Af6941179646967eE30d5F25F" as `0x${string}`, // 10 USDC, 5 people
      medium: "0x990433587e959a9A2A5178f8cE734607cAfbd3f3" as `0x${string}`, // 50 USDC, 10 people
      large: "0x1837f572Ff121b378cE9e258b5B2Dabf2268a3fe" as `0x${string}`, // 100 USDC, 20 people
    },
  },
  // Mantle Sepolia Testnet
  mantleSepolia: {
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

// Use Ethereum Sepolia for hackathon demo
export const ACTIVE_CHAIN = "ethereumSepolia" as keyof typeof CONTRACTS;
export const activeContracts = CONTRACTS[ACTIVE_CHAIN];
