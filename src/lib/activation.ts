// =============================================================================
// Standard-account activation
// =============================================================================
// Standard plans owe an $80 activation fee to convert a passed evaluation into
// a funded account — Advanced/Builder (Dynasty) do not. The fee is paid on the
// YPF-owned WooCommerce store via a per-size activation product. We deep-link
// the size-matched product; binding to the trader happens by email at checkout.
//
// NOTE: an account-SPECIFIC binding (when a trader has several same-size
// Standard accounts pending activation) needs YPF's server-minted `ypf-ref`
// token, which we can't forge — these permalinks rely on email + size match.
// =============================================================================

export const STANDARD_ACTIVATION_FEE_USD = 80;

const ACTIVATION_PRODUCT_BASE = "https://checkout.dynastyfuturesdyn.com/product";

const sizeSlug = (sizeUsd: number): string | null => {
  if (sizeUsd <= 25000) return "25k";
  if (sizeUsd <= 50000) return "50k";
  if (sizeUsd <= 100000) return "100k";
  if (sizeUsd <= 150000) return "150k";
  return null;
};

/**
 * The activation-checkout URL for a Standard account of the given size, or
 * null when the plan carries no activation fee (Advanced/Builder) or the size
 * is unrecognized.
 */
export const standardActivationUrl = (
  plan: string,
  sizeUsd: number,
): string | null => {
  if (plan !== "Standard") return null;
  const slug = sizeSlug(sizeUsd);
  return slug ? `${ACTIVATION_PRODUCT_BASE}/${slug}-standard-activation/` : null;
};
