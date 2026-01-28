

## Plan: Add 50% Withdrawal Limit Rule to Rules Page

### Overview
Add a new rule to the Universal Rules section on the Rules page that matches the existing rule card/row style.

---

### Changes Required

**File:** `src/pages/Rules.tsx`

#### Add New Rule to universalRules Array

Insert the new rule object after the "Payout Delivery Time" rule (around line 76) and before the "5-Payout Rolling Cap" rule. This groups it with other payout-related rules.

**New Rule Object:**
```tsx
{
  icon: DollarIcon,
  title: '50% Withdrawal Limit',
  description: 'Traders may withdraw up to 50% of their account balance per payout request. The remaining balance must stay in the account.',
  allowed: true,
},
```

---

### Placement Logic

The `universalRules` array contains these payout-related rules in order:
1. Trading Freeze During Payout Processing
2. Withdrawal Buffer Freeze  
3. Payout Processing Window
4. Cutoff Time
5. Payout Delivery Time
6. **→ NEW: 50% Withdrawal Limit** (insert here)
7. 5-Payout Rolling Cap
8. Post-Payout MLL Reset
9. Post-5 Payout Profit Split Adjustment

---

### Rule Properties Explained

| Property | Value | Reason |
|----------|-------|--------|
| `icon` | `DollarIcon` | Matches theme of withdrawal/money rules |
| `title` | `50% Withdrawal Limit` | Verbatim as requested |
| `description` | Verbatim as requested | Exact text provided |
| `allowed` | `true` | Defines what IS allowed (similar to other cap rules) |

---

### What Stays the Same
- All existing rules unchanged
- No layout, styling, spacing, or icon treatment modifications
- Page structure preserved
- Rule card/row style automatically applied via existing `RuleRow` component

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Rules.tsx` | Add 1 new rule object to `universalRules` array (line ~77) |

