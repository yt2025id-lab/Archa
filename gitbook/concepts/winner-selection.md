# 🎲 Winner Selection

Guide on how arisan winners are determined in Archa.

## Overview

Every month, one participant receives the arisan pot. In Archa, winners are determined fairly and transparently using Verifiable Random Function (VRF).

## Why Random?

### Problems with Traditional Arisan

In traditional arisan, determining turns can be problematic:

| Method | Problem |
|--------|---------|
| Manual draw | Can be cheated |
| Join order | Unfair, early joiners always win first |
| Negotiation | Drama, not objective |
| Organizer decides | Conflict of interest |

### Archa's Solution

VRF guarantees:
- **Unpredictable:** No one can predict the winner
- **Verifiable:** Results can be verified on-chain
- **Tamper-proof:** Cannot be manipulated by anyone
- **Fair:** Every eligible participant has equal chance

## How VRF Works

### 1. Eligible Participants

At the end of each cycle, the smart contract identifies eligible participants:

```solidity
Eligible if:
├─ isParticipant == true
├─ hasReceivedPot == false
├─ isNotDefaulted == true
└─ hasDepositedThisCycle == true (or collateral covered)
```

### 2. Random Number Generation

```
VRF Process:
├─ Smart contract requests random number
├─ Chainlink VRF (or similar) generates randomness
├─ Random number returned to contract
├─ Number is verifiable by anyone
└─ Cannot be predicted or influenced
```

### 3. Winner Mapping

```solidity
// Pseudocode
function selectWinner(uint256 randomNumber) {
    address[] memory eligible = getEligibleParticipants();
    uint256 winnerIndex = randomNumber % eligible.length;
    address winner = eligible[winnerIndex];
    return winner;
}
```

### 4. Distribution

```
Winner receives:
├─ All deposits this cycle
├─ Accrued yield for this cycle
└─ Total transferred to winner's wallet
```

## Example Timeline

### Pool: 5 Participants

```
CYCLE 1:
├─ Eligible: [A, B, C, D, E] (5 people)
├─ Random number: 847293
├─ 847293 % 5 = 3
├─ Winner: Participant D (index 3)
└─ D receives pot, marked as "hasReceivedPot"

CYCLE 2:
├─ Eligible: [A, B, C, E] (4 people, D excluded)
├─ Random number: 129384
├─ 129384 % 4 = 0
├─ Winner: Participant A (index 0)
└─ A receives pot

CYCLE 3:
├─ Eligible: [B, C, E] (3 people)
├─ Random number: 567890
├─ 567890 % 3 = 2
├─ Winner: Participant E (index 2)
└─ E receives pot

... (continues until all have received)
```

## Fairness Guarantee

### Equal Probability

Every eligible participant has equal probability:

```
Cycle 1 (5 people): Each has 20% chance
Cycle 2 (4 people): Each has 25% chance
Cycle 3 (3 people): Each has 33.3% chance
Cycle 4 (2 people): Each has 50% chance
Cycle 5 (1 person): 100% (last remaining)
```

### Everyone Gets Exactly Once

```
Guarantee:
├─ Total cycles = Number of participants
├─ Each cycle, one winner selected
├─ Winners excluded from future selection
└─ Result: Everyone gets pot exactly once
```

## Verifiability

### On-Chain Proof

All data is stored on-chain:

```
Verifiable data:
├─ VRF request transaction
├─ VRF response transaction
├─ Random number used
├─ Winner address
├─ Pot amount distributed
└─ Timestamp
```

### How to Verify

1. Go to block explorer
2. Find VRF fulfillment transaction
3. Check random number in logs
4. Apply modulo to eligible list
5. Confirm winner matches

## Edge Cases

### What if Someone Defaults Mid-Cycle?

```
Scenario: B defaults in cycle 3

Before selection:
├─ Check B's deposit status
├─ If not deposited + no collateral: Remove B
├─ If collateral covered: B remains eligible
└─ Selection proceeds with valid list
```

### What if Winner Defaults After Winning?

```
Scenario: A wins cycle 2, then defaults cycle 3

├─ A already has pot (cannot be taken back)
├─ Cycle 3: A's collateral covers their deposit
├─ Other participants not affected
└─ A's future yield from collateral reduced
```

### What if Only One Eligible Left?

```
Last cycle scenario:
├─ Only 1 person hasn't received pot
├─ Random selection still runs (for consistency)
├─ That person wins with 100% probability
└─ Pool marked as COMPLETED
```

## Randomness Source

### Current Implementation

For hackathon phase:
- Block hash + timestamp as randomness seed
- Simple but not fully secure

### Future Implementation

Production will use:
- Chainlink VRF
- Or Mantle-native VRF solution
- Fully verifiable and manipulation-proof

## Timing

### When Does Selection Happen?

```
Timeline each cycle:
├─ Day 1-25: Deposit window
├─ Day 26-28: Grace period
├─ Day 29: Check deposits, slash if needed
├─ Day 30: Winner selection + distribution
└─ Day 1 (next): New cycle starts
```

### Who Triggers Selection?

```
Trigger options:
├─ Automatic (keeper/relayer service)
├─ Any user (for gas incentive)
└─ Emergency: Admin (only if stuck)
```

## Receiving Winnings

### Automatic Distribution

When you win:
1. Smart contract automatically transfers pot to your wallet
2. You receive notification (if enabled)
3. Funds immediately available
4. Status updated to "hasReceivedPot = true"

### What You Receive

```
Winner Pot Breakdown:
├─ Base deposits: depositAmount × participants
├─ Cycle yield: AI-generated yield this period
└─ TOTAL: All above combined

Example (10 people × 50 USDC):
├─ Base: 500 USDC
├─ Yield: +42 USDC
└─ TOTAL: 542 USDC
```

## FAQ

### "Can I choose when to win?"

No. Randomness guarantees fairness - no one can choose or predict.

### "Is it better to win early or late?"

Mathematically:
- **Win early:** Get pot sooner, can reinvest
- **Win late:** Pot may be larger (more yield accrued)
- **Overall:** Expected value is the same for all positions

### "What if VRF service is down?"

Fallback mechanisms:
- Retry with delay
- Alternative randomness source
- Manual trigger with community oversight

### "Can I see who's eligible before selection?"

Yes, the eligible list is visible on-chain. But the random number cannot be predicted, so it cannot be exploited.
