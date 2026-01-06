# 💳 Make Deposits

Complete guide to making monthly deposits in Archa pools.

## Overview

Every cycle, all participants must deposit. These deposits are collected and given to that cycle's winner.

```
Deposit Flow:
├─ Cycle starts
├─ Deposit window opens (25 days)
├─ Grace period (3 days)
├─ Deadline
├─ Slashing (if not deposited)
└─ Winner selection + distribution
```

## When to Deposit?

### Timeline Each Cycle

```
30-Day Cycle Example:
├─ Day 1-25: Regular deposit window
├─ Day 26-28: Grace period (can still deposit)
├─ Day 29: Final check
└─ Day 30: Winner selection
```

### Your Deposit Status

On the dashboard, check your deposit status:

```
My Deposit Status:
├─ Current Cycle: 5
├─ This Cycle Deposit: ❌ NOT DEPOSITED
├─ Deadline: Jan 28, 2025 23:59 UTC
├─ Days Left: 7 days
└─ Collateral Buffer: Available (auto-deposit if missed)
```

## How to Deposit

### Step 1: Open Pool

1. Navigate to dashboard or **My Pools**
2. Select the pool you want to deposit to
3. Click **"View Pool"**

### Step 2: Deposit Section

```
Deposit This Cycle:
├─ Amount Due: 50 USDC
├─ Your Balance: 234 USDC
├─ Status: Ready to Deposit
└─ [DEPOSIT NOW] button
```

### Step 3: Execute Deposit

1. Click **"Deposit Now"**
2. Review transaction:
   ```
   Deposit Confirmation:
   ├─ Pool: #42
   ├─ Cycle: 5 of 10
   ├─ Amount: 50 USDC
   └─ Gas: ~0.01 MNT
   ```
3. Confirm in wallet
4. Wait for confirmation

### Step 4: Deposit Complete

```
✅ Deposit Successful!
├─ Transaction: 0x...
├─ Amount: 50 USDC
├─ New Status: DEPOSITED for Cycle 5
└─ Eligible for winner selection: YES
```

## Auto-Deposit from Collateral

### How Does It Work?

If you forget or can't deposit:

```
Auto-Deposit Flow:
├─ Deadline passed
├─ System checks your deposit status
├─ If NOT deposited:
│   ├─ Collateral balance checked
│   ├─ If sufficient: Auto-deduct from collateral
│   └─ If insufficient: Slashing + potential exclusion
└─ You remain eligible (if collateral covered)
```

### Example Scenario

```
Scenario: Forgot to deposit cycle 5

Your status:
├─ Deposit due: 50 USDC
├─ Collateral balance: 250 USDC
├─ Auto-deposit: 50 USDC deducted from collateral
├─ New collateral: 200 USDC
└─ Status: Still eligible for winner selection
```

### Warning!

⚠️ **Collateral auto-deposit is a safety net, not the main solution!**

Risks of relying on collateral:
- Collateral yield decreases
- Collateral can run out
- If depleted, you're slashed and excluded

## Notifications

### Reminder System

Archa will remind you:

| Time | Notification |
|------|-------------|
| Day 1 | "Cycle X started, deposit window open" |
| Day 20 | "5 days left until deposit deadline" |
| Day 25 | "Tomorrow enters grace period" |
| Day 28 | "LAST DAY to deposit!" |

### How to Enable Notifications

1. Connect wallet
2. Open Settings
3. Enable notifications:
   - Browser push notifications
   - Email (if available)
   - Telegram bot (coming soon)

## Batch Deposit

### Multiple Pools

If you've joined multiple pools:

```
My Pending Deposits:
├─ Pool #42: 50 USDC (Due: Jan 28)
├─ Pool #67: 100 USDC (Due: Jan 30)
└─ Pool #103: 25 USDC (Due: Feb 2)

[DEPOSIT ALL] - Total: 175 USDC
```

### Single Transaction

The batch deposit feature allows you to deposit to all pools in one transaction, saving gas.

## Deposit History

### View Past Deposits

```
Deposit History - Pool #42:
├─ Cycle 1: ✅ 50 USDC (Jan 1)
├─ Cycle 2: ✅ 50 USDC (Feb 1)
├─ Cycle 3: ✅ 50 USDC (Mar 1)
├─ Cycle 4: ⚠️ 50 USDC (from collateral)
└─ Cycle 5: ⏳ Pending...
```

### Export Records

For tax or tracking purposes:
- Download CSV deposit history
- View on-chain transactions

## Troubleshooting

### "Insufficient Balance"

```
Problem: USDC balance not enough

Solutions:
├─ Bridge more USDC to Mantle
├─ Swap MNT/other tokens to USDC
└─ Collateral will cover (if available)
```

### "Transaction Failed"

```
Problem: Deposit transaction failed

Solutions:
├─ Check gas balance (MNT)
├─ Check USDC approval
├─ Retry with higher gas
└─ Check network congestion
```

### "Already Deposited"

```
Problem: Trying to deposit twice

Note:
├─ You only need to deposit 1x per cycle
├─ Double deposit is not allowed
└─ Excess will be rejected
```

### "Pool Not Active"

```
Problem: Cannot deposit

Possible reasons:
├─ Pool still WAITING (not full)
├─ Pool already COMPLETED
├─ Cycle hasn't started
└─ Deposit window not open
```

## Best Practices

### Deposit on Time

✅ **DO:**
- Set calendar reminder
- Deposit early in the cycle
- Maintain USDC buffer
- Enable notifications

❌ **DON'T:**
- Don't wait until last minute
- Don't rely on collateral
- Don't ignore notifications

### Financial Planning

```
Monthly Planning:
├─ Pool A deposit: 50 USDC (1st of month)
├─ Pool B deposit: 100 USDC (15th of month)
├─ Total monthly: 150 USDC
└─ Buffer: Always keep extra 50 USDC
```

## FAQ

### "Can I deposit early?"

Yes! You can deposit anytime during the deposit window. No need to wait until the deadline.

### "What if I deposit late?"

As long as it's within the grace period, deposit is still accepted. After the deadline, collateral is used (if available).

### "Can I deposit partial?"

No. Deposit must be the full amount per pool requirement.

### "Where does my deposit go?"

Deposit goes to the pool smart contract and is immediately deployed to the AI yield optimizer. At cycle end, pot + yield goes to the winner.

### "Can deposits be refunded?"

No. Deposits for the current cycle cannot be refunded. They go into the winner's pot.
