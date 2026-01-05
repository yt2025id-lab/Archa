# 🎲 Winner Selection

Panduan tentang bagaimana pemenang arisan ditentukan di Archa.

## Overview

Setiap bulan, satu peserta akan menerima pot arisan. Di Archa, pemenang ditentukan secara fair dan transparan menggunakan Verifiable Random Function (VRF).

## Kenapa Random?

### Masalah Arisan Tradisional

Di arisan tradisional, penentuan giliran bisa bermasalah:

| Metode | Problem |
|--------|---------|
| Undian manual | Bisa dicurangi |
| Urutan join | Unfair, yang join duluan selalu menang duluan |
| Negosiasi | Drama, tidak objektif |
| Ketua tentukan | Conflict of interest |

### Solusi Archa

VRF menjamin:
- **Unpredictable:** Tidak ada yang bisa prediksi pemenang
- **Verifiable:** Hasil bisa diverifikasi on-chain
- **Tamper-proof:** Tidak bisa dimanipulasi siapapun
- **Fair:** Setiap eligible participant punya chance sama

## Cara Kerja VRF

### 1. Eligible Participants

Setiap akhir cycle, smart contract mengidentifikasi eligible participants:

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

Setiap eligible participant punya probabilitas sama:

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

Semua data tersimpan on-chain:

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

Ketika Anda menang:
1. Smart contract otomatis transfer pot ke wallet Anda
2. Anda menerima notification (if enabled)
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

### "Bisa tidak milih kapan mau menang?"

Tidak. Randomness menjamin fairness - tidak ada yang bisa memilih atau memprediksi.

### "Kalau menang awal vs akhir, mana yang lebih untung?"

Secara matematis:
- **Menang awal:** Dapat pot lebih cepat, bisa diinvestasikan
- **Menang akhir:** Pot mungkin lebih besar (more yield accrued)
- **Overall:** Expected value sama untuk semua position

### "Bagaimana jika VRF service down?"

Fallback mechanisms:
- Retry dengan delay
- Alternative randomness source
- Manual trigger dengan community oversight

### "Bisa tidak lihat siapa eligible sebelum selection?"

Ya, eligible list visible on-chain. Tapi random number tidak bisa diprediksi, jadi tidak bisa dimanfaatkan.
