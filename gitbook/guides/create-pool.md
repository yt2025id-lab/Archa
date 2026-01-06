# 🎯 Create a Pool

Complete guide to creating a new arisan pool in Archa.

## Who Can Create a Pool?

Anyone! No special permission needed to create a pool. You just need:
- A connected wallet
- MNT for gas fees
- USDC for first deposit + collateral (if joining immediately)

## Pool Parameters

When creating a pool, you need to set the following parameters:

### 1. Deposit Amount

The amount of USDC to be deposited each cycle.

```
Recommendations:
├─ Beginners: 10-50 USDC
├─ Intermediate: 50-200 USDC
└─ Advanced: 200-1000 USDC
```

**Tip:** Match your target audience. Smaller deposit pools fill faster.

### 2. Total Participants

Maximum number of participants in the pool.

```
Considerations:
├─ 5 participants: Pool finishes quickly, smaller pot
├─ 10 participants: Balance between duration and pot
├─ 20 participants: Large pot, but longer commitment
└─ Max: 50 participants
```

**Pot Formula:**
```
Pot Size = Deposit × Participants + Yield
Example: 50 USDC × 10 people = 500 USDC + yield
```

### 3. Cycle Duration

Duration of each cycle (time between rotations).

```
Standard options:
├─ 7 days (weekly)
├─ 14 days (bi-weekly)
├─ 30 days (monthly) ← Most common
└─ 60 days (bi-monthly)
```

### 4. Pool Name (Optional)

Name for easy identification.

```
Example names:
├─ "Family Savings Pool"
├─ "Crypto Enthusiasts Pool"
├─ "Mantle Builders"
└─ "Diamond Hands Club"
```

## Steps to Create a Pool

### Step 1: Open Create Pool

1. Navigate to the **Pools** page
2. Click the **"Create Pool"** button
3. The pool creation form will appear

### Step 2: Fill in Parameters

```
Create New Pool Form:
├─ Pool Name: [optional]
├─ Deposit Amount: [input USDC]
├─ Number of Participants: [dropdown 5-50]
├─ Cycle Duration: [dropdown]
└─ Join as Creator: [checkbox]
```

### Step 3: Review Summary

```
Pool Summary:
├─ Deposit per Cycle: 50 USDC
├─ Total Participants: 10
├─ Total Duration: 10 months
├─ Max Pot Size: 500+ USDC
├─ Collateral Required: 562.5 USDC (per participant)
└─ Estimated Creation Gas: ~0.05 MNT
```

### Step 4: Create Pool

1. Click **"Create Pool"**
2. Approve transaction in wallet
3. Wait for confirmation

### Step 5: Pool Created!

```
Pool Created Successfully:
├─ Pool ID: #142
├─ Contract Address: 0x...
├─ Status: WAITING (0/10 participants)
└─ Share Link: https://archa.xyz/pool/142
```

## Join as Creator

### Option 1: Create Only

- You only create the pool
- Not automatically a participant
- No deposit/collateral needed at creation

### Option 2: Create & Join

- You create and join immediately
- Need deposit + collateral
- You are the first participant

```
Create & Join:
├─ Creation Gas: ~0.05 MNT
├─ First Deposit: 50 USDC
├─ Collateral: 562.5 USDC
└─ Total: 612.5 USDC + gas
```

## Inviting Participants

### Share Pool Link

After pool is created, share the link with potential participants:

```
https://arisanonchain.vercel.app/pool/[POOL_ID]
```

### Social Sharing

Use social media:
- Twitter/X
- Telegram group
- Discord
- WhatsApp

### Pool Discovery

Your pool will also appear in:
- Explore Pools page
- Search by parameters

## Pool Lifecycle

```
CREATED ──► WAITING ──► ACTIVE ──► COMPLETED
    │           │          │           │
    │           │          │           └─ Everyone has received pot
    │           │          └─ Pool full, cycles running
    │           └─ Waiting for participants
    └─ Pool just created
```

### Status Transitions

| From | To | Trigger |
|------|-----|---------|
| Created | Waiting | Pool deployed |
| Waiting | Active | All slots filled |
| Active | Completed | All cycles done |

## Best Practices

### For a Successful Pool

✅ **DO:**
- Choose a reasonable deposit amount
- Set a realistic participant count
- Have a community/group ready to join
- Explain arisan rules to potential participants

❌ **DON'T:**
- Don't set deposit too high
- Don't set too many participants
- Don't create a pool without a link distribution plan

### Pool Filling Strategy

```
Tips to fill your pool:
├─ Start with inner circle (friends/family)
├─ Share in crypto communities
├─ Explain Archa benefits vs traditional arisan
├─ Educate about collateral
└─ Be the first participant (builds trust)
```

## Cancel Pool

### Can You Cancel?

```
Cancel Rules:
├─ Status WAITING: Can cancel if no participants yet
├─ Status ACTIVE: CANNOT cancel
└─ Refund: All deposits returned
```

### How to Cancel

1. Open the pool you created
2. Click **"Cancel Pool"** (if eligible)
3. Confirm transaction
4. All participants refunded

## FAQ

### "Does the creator get special benefits?"

No. Creator is treated the same as other participants. No special fee or privilege.

### "What if the pool doesn't fill?"

Pool remains in WAITING status. Participants who joined can withdraw. No time limit for filling.

### "Can parameters be changed after creation?"

No. Pool parameters cannot be changed after creation. If changes are needed, cancel and create a new pool.

### "What's the gas fee for creating a pool?"

Around 0.05-0.1 MNT on Mantle Network (very cheap).

### "My pool doesn't appear in Explore?"

Make sure the pool is confirmed on blockchain. Refresh the page after a few seconds.
