# 🔒 Collateral System

Complete guide to the collateral system in Archa.

## What is Collateral?

Collateral is a security deposit that every participant must pay before joining an arisan pool. Collateral serves as:

1. **Commitment Guarantee:** Ensures participants will consistently make deposits
2. **Pool Protection:** If someone defaults, the pool continues running
3. **Additional Yield Source:** Collateral is also invested in DeFi

## Why is Collateral Needed?

### Traditional Arisan Problem

```
Without Collateral:
├─ Participant A gets their turn in month 2
├─ Participant A receives 500 USDC
├─ Month 3: Participant A runs away
├─ Month 4 onwards: Participant A doesn't pay
└─ Other participants LOSE because pot is incomplete
```

### With Collateral System

```
With Collateral:
├─ Participant A deposits collateral 562.5 USDC
├─ Participant A gets their turn in month 2
├─ Participant A receives 500 USDC
├─ Month 3: Participant A doesn't pay
├─ Smart contract slashes collateral 50 USDC
├─ Pot remains full for that month's winner
└─ Other participants NOT AFFECTED
```

## Collateral Formula

```
Collateral = 125% × Deposit Amount × (Number of Participants - 1)
```

### Formula Explanation

**Why subtract 1?**

Because each participant will receive the pot exactly once. When receiving the pot, they don't need to deposit that month (the pot already covers it). So maximum obligation is `(N-1)` deposits.

**Why 125%?**

The 125% multiplier ensures there's no economic benefit from running away after winning. If someone wins first turn and runs away, they will lose more collateral than they received from the pot.

### Calculation Examples

**Pool 5 people × 10 USDC:**
```
Collateral = 1.25 × 10 × (5-1) = 1.25 × 10 × 4 = 50 USDC
```

**Pool 10 people × 50 USDC:**
```
Collateral = 1.25 × 50 × (10-1) = 1.25 × 50 × 9 = 562.5 USDC
```

**Pool 20 people × 100 USDC:**
```
Collateral = 1.25 × 100 × (20-1) = 1.25 × 100 × 19 = 2,375 USDC
```

## Collateral Scenarios

### Scenario 1: Consistent Participant

```
Timeline of Consistent Participant:
├─ Month 0: Deposit collateral 562.5 USDC + deposit 50 USDC
├─ Month 1-9: Deposit 50 USDC each month
├─ Month X: Get turn, receive pot + yield
├─ Month 10: Arisan complete
└─ Receive: Collateral 562.5 USDC + collateral yield ~34 USDC
```

**Result:** Participant gets all money back plus bonus yield.

### Scenario 2: Participant Defaults Before Getting Turn

```
Participant B defaults in month 4 (hasn't received turn yet):
├─ Month 0-3: Normal deposits
├─ Month 4: DOESN'T deposit
├─ 3-day grace period: No payment
├─ Collateral slashed: 562.5 - 50 = 512.5 USDC
├─ Month 5: DOESN'T deposit
├─ Collateral slashed: 512.5 - 50 = 462.5 USDC
├─ ... (continues until collateral depleted)
└─ Participant B removed from pool
```

**Result:** Participant B loses collateral, doesn't get their turn.

### Scenario 3: Participant Defaults After Getting Turn (With 125%)

```
Participant C gets turn month 1 (first), then defaults:
├─ Month 1: GETS TURN, receives pot 500 USDC
├─ Month 2-10: Doesn't deposit (9 months)
├─ Initial collateral: 562.5 USDC
├─ Collateral slashed: 9 × 50 = 450 USDC
├─ Remaining collateral: 562.5 - 450 = 112.5 USDC (forfeited)
└─ Net position: 500 - 562.5 = -62.5 USDC (LOSS!)
```

**Result:** With 125% multiplier, participants who run away after winning still LOSE!

{% hint style="success" %}
The 125% collateral system ensures no economic benefit from running away:
- First pot = N × deposit = 500 USDC
- Collateral = 1.25 × deposit × (N-1) = 562.5 USDC
- Running away after first win = LOSS of 62.5 USDC
{% endhint %}

## Slashing Mechanism

### Slashing Triggers

Collateral is slashed if:
1. Participant doesn't deposit within deadline
2. Grace period (3 days) passes
3. No action from participant

### Slashing Process

```solidity
// Pseudocode
function checkAndSlash(participant) {
    if (block.timestamp > depositDeadline + gracePeriod) {
        if (!hasDeposited[participant]) {
            uint256 slashAmount = depositAmount;
            collateral[participant] -= slashAmount;
            poolBalance += slashAmount;

            if (collateral[participant] == 0) {
                removeParticipant(participant);
            }
        }
    }
}
```

### Auto-Slash vs Manual Trigger

- **Auto-slash:** Smart contract automatically checks every block
- **Keeper trigger:** External service triggers slash function
- **User trigger:** Anyone can trigger slash for gas reward

## Collateral and Yield

### Collateral Also Generates Yield

Collateral doesn't just sit idle - AI Yield Optimizer also invests collateral into DeFi protocols.

```
Total investable funds:
├─ Pool deposits: Rolling (changes each month)
├─ All collateral: Locked for duration
└─ Combined: Larger pool = better yields
```

### Yield Distribution

```
Collateral Yield Distribution:
├─ Accrued during pool lifetime
├─ Calculated per participant based on duration
└─ Distributed at pool completion

Example:
├─ Your collateral: 562.5 USDC
├─ Pool duration: 10 months
├─ Average APY: 8%
├─ Your yield: 562.5 × 8% × (10/12) = ~37.5 USDC
```

## Collateral vs Trust

### Comparison

| Aspect | Trust-based (Traditional) | Collateral-based (Archa) |
|--------|--------------------------|--------------------------|
| **Who can join** | Close acquaintances only | Anyone |
| **Run-away risk** | High | Minimal |
| **Protection** | None | Automatic |
| **Scale** | Limited | Unlimited |
| **Enforcement** | Social | Smart contract |

### Why Collateral is Better

1. **Objective:** No subjective judgment
2. **Automatic:** No negotiation or apologies needed
3. **Fair:** All participants treated equally
4. **Scalable:** Can arisan with strangers

## Collateral FAQ

### "Collateral is too big, what should I do?"

**Option 1:** Join a pool with smaller deposit amount
```
Pool 10 USDC/month → Collateral only 50-238 USDC (depends on participants)
```

**Option 2:** Join a pool with fewer participants
```
Pool 5 people → Collateral = 1.25 × 4 × deposit = 5× deposit
Pool 20 people → Collateral = 1.25 × 19 × deposit = 23.75× deposit
```

### "When is collateral returned?"

Collateral is returned when:
- Pool completes (everyone has received their turn)
- Pool is cancelled (before start)

Not returned if:
- You default during the pool
- Pool emergency shutdown (case-by-case)

### "What if I need money urgently?"

{% hint style="danger" %}
Collateral CANNOT be withdrawn mid-pool. This is by design to guarantee pool integrity.
{% endhint %}

If you need money urgently, options:
1. Keep depositing until you get your turn
2. Let collateral cover remaining obligations (will lose money)
3. Find external funding for deposits

### "What if everyone defaults?"

Extremely unlikely because:
- Everyone has collateral at stake
- Auto-slashing covers the pot
- Economic incentive to be consistent

Worst case: Pool ends early, remaining collateral distributed proportionally.
