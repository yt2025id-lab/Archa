# Smart Contracts

Technical documentation for Archa's smart contract architecture.

## Contract Overview

Archa uses three main contracts:

| Contract | Purpose |
|----------|---------|
| **ArisanFactory** | Creates and manages pool instances |
| **ArisanPool** | Individual pool logic and state |
| **AIYieldStrategy** | Yield optimization execution |

## Deployed Addresses

### Mantle Sepolia Testnet

| Contract | Address |
|----------|---------|
| ArisanFactory | `0x15078CaEC56D393F8966999E12e1C03d34D27C16` |
| AIYieldStrategy | `0x09beBF7c34b05234c0c2462DCCC9A828B595de12` |
| MockUSDC | `0xb52fF96A29262BD8dC9a0Fc56CcA5a9EC9Ddbc9D` |

### Pre-deployed Pools

| Pool | Address | Deposit |
|------|---------|---------|
| Small Pool | `0xa5fe7e4db7cc25a6aeb67f787be0c3da6a4e1b05` | 10 USDC |
| Medium Pool | `0x71560fc237b64a7625a6056c7d02e303652ef1b7` | 50 USDC |
| Large Pool | `0x98e5733617b661aa7bb5dd71185174ee8d519d76` | 100 USDC |

## ArisanFactory

Creates new pool instances and tracks all pools.

### Functions

```solidity
// Create a new pool
function createPool(
    uint256 monthlyDeposit,
    uint256 maxParticipants,
    uint256 collateralAmount,
    address usdcToken
) external returns (address poolAddress);

// Get all pools
function getAllPools() external view returns (address[] memory);

// Get pools by creator
function getPoolsByCreator(address creator) external view returns (address[] memory);
```

### Events

```solidity
event PoolCreated(
    address indexed pool,
    address indexed creator,
    uint256 monthlyDeposit,
    uint256 maxParticipants
);
```

## ArisanPool

Core pool logic for participant management and fund handling.

### State Variables

```solidity
address public usdcToken;
uint256 public monthlyDeposit;
uint256 public maxParticipants;
uint256 public collateralAmount;
uint256 public currentRound;
PoolStatus public status;
address[] public participants;
mapping(address => ParticipantInfo) public participantInfo;
```

### Functions

```solidity
// Join pool with collateral
function joinPool() external;

// Make monthly deposit
function deposit() external;

// Select winner for current round
function selectWinner() external;

// Claim collateral after completion
function claimCollateral() external;

// Get pool information
function getPoolInfo() external view returns (PoolInfo memory);

// Get participant list
function getParticipants() external view returns (address[] memory);
```

### Events

```solidity
event ParticipantJoined(address indexed participant, uint256 collateral);
event DepositMade(address indexed participant, uint256 amount, uint256 round);
event WinnerSelected(address indexed winner, uint256 amount, uint256 round);
event CollateralClaimed(address indexed participant, uint256 amount);
event PoolStatusChanged(PoolStatus newStatus);
```

## AIYieldStrategy

Manages yield optimization across DeFi protocols.

### Functions

```solidity
// Set allocation for a protocol
function setAllocation(
    address protocol,
    uint256 percentage
) external onlyOwner;

// Execute investment
function invest(uint256 amount) external;

// Withdraw from strategies
function withdraw(uint256 amount) external returns (uint256);

// Get current yield
function getCurrentYield() external view returns (uint256);

// Get total invested
function getTotalInvested() external view returns (uint256);
```

## Security Considerations

### Access Control
- Pool functions restricted to participants
- Factory admin functions protected by Ownable
- Strategy changes require owner approval

### Reentrancy Protection
- All external calls use checks-effects-interactions pattern
- ReentrancyGuard on fund transfer functions

### Input Validation
- Amount checks prevent zero transfers
- Participant limits enforced
- Collateral requirements verified

## Development

### Tech Stack
- Solidity ^0.8.20
- Foundry framework
- OpenZeppelin libraries

### Testing

```bash
# Run tests
cd contracts
forge test -vvv

# Coverage
forge coverage
```

### Deployment

```bash
# Deploy to Mantle Sepolia
forge script script/Deploy.s.sol:DeployScript \
    --rpc-url mantle-sepolia \
    --broadcast
```

## Verification

All contracts are verified on [Mantle Sepolia Explorer](https://explorer.sepolia.mantle.xyz).

You can verify any contract:

```bash
forge verify-contract \
    --chain-id 5003 \
    --compiler-version v0.8.20 \
    <CONTRACT_ADDRESS> \
    src/ArisanPool.sol:ArisanPool
```
