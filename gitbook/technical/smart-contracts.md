# 📜 Smart Contracts

Dokumentasi teknis smart contracts Archa.

## Overview

Archa dibangun dengan arsitektur modular menggunakan dua smart contract utama:

```
Contract Architecture:
├─ ArisanFactory.sol
│   └─ Deploys and manages all pools
└─ ArisanPool.sol
    └─ Individual pool logic
```

## ArisanFactory

### Deskripsi

Factory contract untuk membuat dan mengelola pool arisan.

### Functions

#### createPool

Membuat pool arisan baru.

```solidity
function createPool(
    uint256 _depositAmount,
    uint256 _totalParticipants,
    uint256 _cycleDuration
) external returns (address poolAddress)
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `_depositAmount` | uint256 | Jumlah USDC per cycle |
| `_totalParticipants` | uint256 | Jumlah maksimum peserta |
| `_cycleDuration` | uint256 | Durasi cycle dalam detik |

**Returns:** Address pool yang baru dibuat

**Events:**
```solidity
event PoolCreated(
    address indexed poolAddress,
    address indexed creator,
    uint256 depositAmount,
    uint256 totalParticipants
);
```

#### getPools

Mendapatkan daftar semua pool.

```solidity
function getPools() external view returns (address[] memory)
```

#### getPoolCount

Mendapatkan jumlah total pool.

```solidity
function getPoolCount() external view returns (uint256)
```

### State Variables

```solidity
address[] public pools;           // Array semua pool addresses
address public usdcToken;         // USDC token address
address public yieldOptimizer;    // AI Yield Optimizer address
```

## ArisanPool

### Deskripsi

Contract untuk individual pool arisan dengan fitur collateral dan yield optimization.

### Structs

#### Participant

```solidity
struct Participant {
    address addr;           // Wallet address
    bool hasReceivedPot;    // Sudah menerima pot?
    uint256 collateral;     // Collateral amount
    uint256 depositsCount;  // Jumlah deposit yang sudah dilakukan
}
```

#### PoolState

```solidity
enum PoolState {
    WAITING,    // Menunggu participants
    ACTIVE,     // Pool sedang berjalan
    COMPLETED   // Semua cycle selesai
}
```

### Core Functions

#### joinPool

Bergabung ke pool dengan deposit + collateral.

```solidity
function joinPool() external
```

**Requirements:**
- Pool dalam state WAITING
- Masih ada slot kosong
- User belum bergabung
- USDC allowance sufficient

**Process:**
1. Transfer deposit pertama
2. Transfer collateral
3. Register sebagai participant
4. Jika pool penuh, ubah state ke ACTIVE

**Events:**
```solidity
event ParticipantJoined(
    address indexed participant,
    uint256 depositAmount,
    uint256 collateralAmount
);
```

#### deposit

Melakukan deposit untuk cycle yang sedang berjalan.

```solidity
function deposit() external
```

**Requirements:**
- Pool dalam state ACTIVE
- Caller adalah participant
- Belum deposit cycle ini
- Dalam deposit window

**Events:**
```solidity
event DepositMade(
    address indexed participant,
    uint256 cycle,
    uint256 amount
);
```

#### selectWinner

Memilih pemenang untuk cycle yang sedang berjalan.

```solidity
function selectWinner() external
```

**Requirements:**
- Pool dalam state ACTIVE
- Deposit window sudah tutup
- Winner belum dipilih untuk cycle ini

**Process:**
1. Identify eligible participants
2. Request random number (VRF)
3. Map random to winner
4. Transfer pot to winner
5. Mark winner as hasReceivedPot
6. Advance to next cycle

**Events:**
```solidity
event WinnerSelected(
    address indexed winner,
    uint256 cycle,
    uint256 potAmount
);
```

#### claimCollateral

Klaim collateral setelah pool selesai.

```solidity
function claimCollateral() external
```

**Requirements:**
- Pool dalam state COMPLETED
- Caller adalah participant
- Collateral belum diklaim

### View Functions

#### getParticipants

```solidity
function getParticipants() external view returns (Participant[] memory)
```

#### getPoolInfo

```solidity
function getPoolInfo() external view returns (
    PoolState state,
    uint256 currentCycle,
    uint256 depositAmount,
    uint256 totalParticipants,
    uint256 currentParticipants,
    uint256 cycleDuration
)
```

#### getEligibleParticipants

```solidity
function getEligibleParticipants() external view returns (address[] memory)
```

#### isDeposited

```solidity
function isDeposited(address _participant, uint256 _cycle)
    external view returns (bool)
```

### Modifiers

```solidity
modifier onlyParticipant() {
    require(isParticipant[msg.sender], "Not a participant");
    _;
}

modifier inState(PoolState _state) {
    require(state == _state, "Invalid pool state");
    _;
}

modifier duringDepositWindow() {
    require(block.timestamp < cycleEndTime - gracePeriod, "Deposit window closed");
    _;
}
```

### State Variables

```solidity
// Pool Configuration
uint256 public depositAmount;
uint256 public totalParticipants;
uint256 public cycleDuration;
uint256 public gracePeriod;

// Pool State
PoolState public state;
uint256 public currentCycle;
uint256 public cycleStartTime;
uint256 public cycleEndTime;

// Participants
mapping(address => Participant) public participants;
mapping(address => bool) public isParticipant;
address[] public participantList;

// Deposits
mapping(uint256 => mapping(address => bool)) public cycleDeposits;

// Yield
uint256 public totalYield;
address public yieldOptimizer;
```

## Collateral Logic

### Collateral Calculation

```solidity
function calculateCollateral() public view returns (uint256) {
    return depositAmount * (totalParticipants - 1);
}
```

### Auto-Deposit from Collateral

```solidity
function _handleMissedDeposit(address _participant) internal {
    Participant storage p = participants[_participant];

    if (p.collateral >= depositAmount) {
        // Auto-deduct from collateral
        p.collateral -= depositAmount;
        cycleDeposits[currentCycle][_participant] = true;
        emit CollateralUsed(_participant, depositAmount);
    } else {
        // Slash remaining collateral
        uint256 slashed = p.collateral;
        p.collateral = 0;
        emit ParticipantSlashed(_participant, slashed);
    }
}
```

### Slashing Mechanism

```solidity
function _slashCollateral(address _participant) internal {
    Participant storage p = participants[_participant];
    uint256 slashAmount = p.collateral;

    if (slashAmount > 0) {
        p.collateral = 0;
        // Distribute to other participants or treasury
        _distributeSlashedFunds(slashAmount);
        emit CollateralSlashed(_participant, slashAmount);
    }
}
```

## Yield Integration

### Deposit to Optimizer

```solidity
function _depositToOptimizer(uint256 _amount) internal {
    IERC20(usdcToken).approve(yieldOptimizer, _amount);
    IYieldOptimizer(yieldOptimizer).deposit(_amount);
}
```

### Withdraw from Optimizer

```solidity
function _withdrawFromOptimizer(uint256 _amount) internal returns (uint256) {
    return IYieldOptimizer(yieldOptimizer).withdraw(_amount);
}
```

### Harvest Yield

```solidity
function harvestYield() external {
    uint256 yield = IYieldOptimizer(yieldOptimizer).harvest();
    totalYield += yield;
    emit YieldHarvested(yield, totalYield);
}
```

## Security Features

### Reentrancy Guard

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ArisanPool is ReentrancyGuard {
    function deposit() external nonReentrant { ... }
    function selectWinner() external nonReentrant { ... }
    function claimCollateral() external nonReentrant { ... }
}
```

### Access Control

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

// Emergency functions only callable by owner
function emergencyPause() external onlyOwner { ... }
function emergencyWithdraw() external onlyOwner { ... }
```

### Pausable

```solidity
import "@openzeppelin/contracts/security/Pausable.sol";

modifier whenNotPaused() {
    require(!paused, "Contract paused");
    _;
}
```

## Events Summary

```solidity
// Pool Lifecycle
event PoolCreated(address indexed pool, address indexed creator);
event PoolStarted(uint256 timestamp);
event PoolCompleted(uint256 timestamp);

// Participants
event ParticipantJoined(address indexed participant);
event ParticipantSlashed(address indexed participant, uint256 amount);

// Deposits
event DepositMade(address indexed participant, uint256 cycle);
event CollateralUsed(address indexed participant, uint256 amount);

// Winner
event WinnerSelected(address indexed winner, uint256 cycle, uint256 amount);

// Yield
event YieldHarvested(uint256 amount, uint256 total);

// Collateral
event CollateralClaimed(address indexed participant, uint256 amount);
```

## Gas Optimization

### Batch Operations

```solidity
// Batch check deposits
function checkAllDeposits() external {
    for (uint i = 0; i < participantList.length; i++) {
        if (!cycleDeposits[currentCycle][participantList[i]]) {
            _handleMissedDeposit(participantList[i]);
        }
    }
}
```

### Storage Packing

```solidity
// Pack related variables together
struct Participant {
    address addr;           // 20 bytes
    bool hasReceivedPot;    // 1 byte
    uint96 collateral;      // 12 bytes (fits in same slot)
}
```

## Upgrade Path

Contracts designed for potential upgrades:

```solidity
// Proxy pattern for future upgrades
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
```
