# 🏊 Join a Pool

Complete guide to joining an arisan pool in Archa.

## Before Joining

### Preparation

Make sure you have:
- ✅ Connected wallet to Archa
- ✅ USDC on Mantle Network
- ✅ MNT for gas fees
- ✅ Understanding of arisan and collateral concepts

### How Much USDC is Needed?

```
Total USDC Needed:
├─ First monthly deposit
└─ Collateral (125% × deposit × remaining cycles)

Example Pool 50 USDC × 10 months:
├─ Deposit: 50 USDC
├─ Collateral: 1.25 × 50 × 9 = 562.5 USDC
└─ TOTAL: 612.5 USDC
```

## How to Join

### Step 1: Browse Available Pools

1. Open the **Explore Pools** page
2. View the list of available pools
3. Filter by:
   - Deposit amount
   - Duration
   - Number of participants
   - Pool status

### Step 2: Choose a Pool

Consider these factors:

| Factor | Consideration |
|--------|---------------|
| **Deposit Amount** | Match your financial capability |
| **Duration** | Longer pool = longer commitment |
| **Participants** | More = larger pot |
| **Slots Left** | Ensure slots are available |
| **Expected Yield** | Estimated APY from AI optimizer |

### Step 3: Review Pool Details

Click on a pool to see details:

```
Pool Details:
├─ Creator Address
├─ Deposit per Cycle: 50 USDC
├─ Total Cycles: 10
├─ Participants: 7/10
├─ Current Cycle: 0 (not started)
├─ Collateral Required: 562.5 USDC
├─ Estimated Total Pot: 500+ USDC
└─ AI Strategy: Active
```

### Step 4: Join Pool

1. Click the **"Join Pool"** button
2. Review transaction details:
   ```
   Transaction Summary:
   ├─ First Deposit: 50 USDC
   ├─ Collateral Lock: 562.5 USDC
   ├─ Total Transfer: 612.5 USDC
   └─ Estimated Gas: ~0.01 MNT
   ```
3. Click **"Approve USDC"** (if first time)
4. Click **"Confirm Join"**
5. Approve transaction in wallet

### Step 5: Confirmation

After transaction is confirmed:
- ✅ You are registered as a participant
- ✅ First deposit is in
- ✅ Collateral is locked
- ✅ Eligible to receive pot

## After Joining

### Your Dashboard

On the dashboard, you can see:

```
My Pool Status:
├─ Pool Name: Pool #42
├─ My Position: Participant #7
├─ Deposits Made: 1/10
├─ Has Received Pot: No
├─ Collateral Locked: 562.5 USDC
├─ Collateral Yield: 0 USDC (accruing)
└─ Next Deposit Due: Jan 15, 2025
```

### Notifications

You will receive notifications for:
- 🔔 Deposit reminder before deadline
- 🎉 Winner announcement
- 💰 If you win
- ⚠️ Warning if running late

## Edge Cases

### Pool Not Started

```
If pool is not full:
├─ Wait until all slots are filled
├─ Pool starts after full
└─ Deposit & collateral already locked
```

### Slots Full

```
If pool is full:
├─ You cannot join this pool
├─ Find another available pool
└─ Or create your own pool
```

### Transaction Failed

```
If transaction fails:
├─ Check your USDC balance
├─ Check MNT balance for gas
├─ Ensure allowance is approved
└─ Try again with higher gas price
```

## Tips for Choosing Pools

### For Beginners

✅ **DO:**
- Choose pools with small deposits first (10-50 USDC)
- Choose short duration (3-6 months)
- Check if creator is trustworthy

❌ **DON'T:**
- Don't jump into large pools right away
- Don't ignore collateral requirements
- Don't join if not ready to commit

### For Advanced Users

- Diversify across different pools
- Pay attention to expected yield from AI
- Calculate opportunity cost of collateral lock

## Leaving a Pool

### Can You Leave?

```
Exit rules:
├─ BEFORE pool starts: Can withdraw fully
├─ AFTER pool starts: CANNOT leave
└─ Collateral locked until pool completes
```

### Emergency Exit

No emergency exit after pool is active. This protects all participants from:
- Participants who run away after winning
- Pool manipulation
- Unfairness to other participants

## FAQ

### "How long does joining take?"

Transaction usually completes in 2-5 seconds on Mantle.

### "Can I join multiple pools?"

Yes, you can join as many pools as you have USDC for.

### "Is collateral safe?"

Collateral is managed by an audited smart contract. No one can take your collateral except:
- You don't deposit (slashing)
- Pool completes (returned)

### "When does pool start?"

Pool starts when all slots are filled. After that, the first cycle begins immediately.
