# 📖 How It Works

Learn how Archa works in detail.

## Overview

Archa implements traditional arisan in the form of smart contracts with added yield optimization. Here is the complete lifecycle of an arisan pool.

## Pool Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ARCHA POOL LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. CREATION    2. JOINING     3. ACTIVE      4. COMPLETION             │
│      │              │              │               │                    │
│      ▼              ▼              ▼               ▼                    │
│  [Pool Created] → [Users Join] → [Monthly     → [All Done]             │
│   by Creator      + Collateral    Cycles]        Collateral             │
│                                   + Yield        Returned               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Phase 1: Pool Creation

### Creating a Pool
Creator determines pool parameters:
- **Deposit Amount:** Monthly deposit (e.g., 50 USDC)
- **Max Participants:** Number of participants (e.g., 10 people)
- **Cycle Duration:** Duration per cycle (usually 30 days)

### Smart Contract Deployment
When a pool is created, the smart contract automatically calculates:
```solidity
collateralRequired = 1.25 * depositAmount * (maxParticipants - 1)
totalCycles = maxParticipants
estimatedDuration = totalCycles * cycleDuration
```

### Pool Status: OPEN
The pool is now available to join. Status will change to ACTIVE when all slots are filled.

## Phase 2: Joining

### Requirements
To join a pool, users must:
1. Approve USDC spending to smart contract
2. Deposit collateral
3. Deposit first month's payment

### Join Transaction
```
User deposits:
├─ Collateral: 562.5 USDC (locked until completion)
└─ First deposit: 50 USDC (goes to pool)

Total: 612.5 USDC
```

### Participant Registration
Smart contract stores:
- User address
- Collateral amount
- Join timestamp
- Eligible for winning: TRUE
- Has received pot: FALSE

### Pool Full
When the last participant joins:
1. Pool status → ACTIVE
2. First cycle starts
3. AI Yield Optimizer begins working

## Phase 3: Active Cycles

### Monthly Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MONTHLY CYCLE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Day 1-25: DEPOSIT WINDOW                                   │
│  ├─ All participants deposit monthly amount                 │
│  └─ AI invests deposits to DeFi protocols                   │
│                                                             │
│  Day 26-28: GRACE PERIOD                                    │
│  ├─ Reminder for late depositors                            │
│  └─ Collateral warning                                      │
│                                                             │
│  Day 29-30: SETTLEMENT                                      │
│  ├─ Non-depositors: Collateral slashed                      │
│  ├─ Winner selection (VRF random)                           │
│  └─ Pot + yield distributed to winner                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Deposit Handling
```
Scenario A: User deposits on time
→ Deposit added to pool
→ AI allocates to yield protocol
→ User remains eligible

Scenario B: User doesn't deposit
→ Grace period (3 days)
→ If still no deposit: Collateral slashed
→ Slashed amount covers the deposit
→ Pool continues normally
```

### Winner Selection
At the end of each cycle:
1. Smart contract calls VRF (Verifiable Random Function)
2. Random number generated
3. Winner selected from eligible participants
4. Winner receives: Pool deposits + Accrued yield
5. Winner marked as "hasReceivedPot = TRUE"

### Yield Distribution
```
Total pot for winner:
├─ All monthly deposits: 500 USDC (10 × 50)
├─ Pool yield this month: +42 USDC
└─ TOTAL: 542 USDC
```

## Phase 4: Completion

### When Pool Ends
Pool completes when:
- All participants have received pot exactly once
- OR pool is forcefully ended (emergency)

### Final Settlement
```
For each participant who completed all deposits:
├─ Collateral returned: 562.5 USDC
├─ Collateral yield: +34 USDC
└─ Share of remaining pool yield: +15 USDC
─────────────────────────────────────
TOTAL BONUS: 611.5 USDC
```

### For Defaulters
If participant defaulted during the pool:
```
├─ Collateral partially/fully slashed
├─ No yield from slashed portion
└─ May have balance returned if any
```

## AI Yield Optimizer

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                 AI YIELD OPTIMIZER                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INPUT: Pool funds + Collateral funds                       │
│                                                             │
│  ANALYSIS:                                                  │
│  ├─ Fetch APY from all Mantle DeFi protocols               │
│  ├─ Analyze TVL trends (is liquidity stable?)              │
│  ├─ Check for whale movements (risk indicator)             │
│  ├─ Evaluate smart contract risks                          │
│  └─ Calculate risk-adjusted returns                        │
│                                                             │
│  EXECUTION:                                                 │
│  ├─ Allocate funds to selected protocols                   │
│  ├─ Monitor continuously                                   │
│  └─ Rebalance if conditions change                         │
│                                                             │
│  OUTPUT: Optimized yield for pool                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Protocol Selection
AI considers:
1. **APY:** Higher is better, but...
2. **TVL:** More liquidity = less risk
3. **Historical data:** Consistency of yields
4. **Smart contract age:** Older = more tested
5. **Audit status:** Audited protocols preferred

### Rebalancing
AI may move funds if:
- APY drops significantly
- TVL decreases rapidly (whale exit)
- Better opportunity emerges
- Risk profile changes

## Collateral Mathematics

### Why This Formula?

```
Collateral = 125% × Deposit × (Participants - 1)
```

**Logic:**
- Worst case: You win cycle 1, then must deposit 9 more times
- Your remaining obligation: 9 × 50 = 450 USDC
- Collateral at 125%: 1.25 × 450 = 562.5 USDC
- This ensures running away = financial loss

### Slashing Mechanics

```
If you miss a deposit:
├─ Collateral slashed by: depositAmount
├─ Slashed funds go to: Pool (covers your deposit)
└─ Remaining collateral: collateral - depositAmount

If collateral runs out:
├─ You are removed from pool
├─ No more obligations
└─ No yield returned
```

## Security Guarantees

### For Participants
- Collateral protects against defaults
- Smart contract cannot be manipulated
- Winner selection is provably fair
- Yields are distributed automatically

### For Pool Integrity
- Pool always has funds to continue
- No single point of failure
- Transparent on-chain records
- Emergency mechanisms available

## Summary

| Stage | What Happens | Funds Flow |
|-------|--------------|------------|
| Creation | Pool parameters set | None |
| Joining | Users deposit collateral + 1st month | User → Contract |
| Active | Monthly deposits, winner selection | Users → Winner |
| Yield | AI invests to DeFi | Contract → Protocols → Contract |
| Completion | Collateral + yield returned | Contract → Users |
