export type CurrencyCode = "ZAR" | "USD" | "EUR" | "GBP" | "NGN" | "KES" | "BWP";

export interface SupportedCurrency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  toZAR: number;
  locale: string;
}

export const supportedCurrencies: SupportedCurrency[] = [
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦", toZAR: 1, locale: "en-ZA" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", toZAR: 18.52, locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", toZAR: 20.0, locale: "en-IE" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", toZAR: 23.26, locale: "en-GB" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬", toZAR: 0.012, locale: "en-NG" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", flag: "🇰🇪", toZAR: 0.143, locale: "en-KE" },
  { code: "BWP", symbol: "P", name: "Botswana Pula", flag: "🇧🇼", toZAR: 1.35, locale: "en-BW" },
];

export const supportedCurrencyCodes = supportedCurrencies.map(
  ({ code }) => code
) as CurrencyCode[];

export const defaultCurrencyCode: CurrencyCode = "ZAR";
export const currencyPreferenceStorageKey = "gb_preferred_currency";

const regionToCurrencyCode: Partial<Record<string, CurrencyCode>> = {
  AT: "EUR",
  BE: "EUR",
  BW: "BWP",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GB: "GBP",
  GR: "EUR",
  IE: "EUR",
  IT: "EUR",
  KE: "KES",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NA: "ZAR",
  NG: "NGN",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",
  SZ: "ZAR",
  US: "USD",
  ZA: "ZAR",
};

const timezoneCurrencyMatchers: Array<{ pattern: RegExp; code: CurrencyCode }> = [
  { pattern: /^Africa\/Johannesburg$/, code: "ZAR" },
  { pattern: /^Africa\/Lagos$/, code: "NGN" },
  { pattern: /^Africa\/Nairobi$/, code: "KES" },
  { pattern: /^Africa\/Gaborone$/, code: "BWP" },
  { pattern: /^Europe\/London$/, code: "GBP" },
];

function getRegionFromLocale(locale: string) {
  const segments = locale.replace(/_/g, "-").split("-");
  const region = segments[segments.length - 1];

  if (!region || region.length !== 2) {
    return null;
  }

  return region.toUpperCase();
}

export function getCurrencyByCode(code?: string) {
  return (
    supportedCurrencies.find((currency) => currency.code === code) ||
    supportedCurrencies.find((currency) => currency.code === defaultCurrencyCode)!
  );
}

export function formatCurrencyAmount(
  amount: number,
  currency: SupportedCurrency,
  options: Intl.NumberFormatOptions = {}
) {
  return `${currency.symbol}${amount.toLocaleString(currency.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  })}`;
}

export function roundCurrencyAmount(amount: number) {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  if (Math.abs(amount) >= 1000) {
    return Number(amount.toFixed(0));
  }

  if (Math.abs(amount) >= 1) {
    return Number(amount.toFixed(2));
  }

  return Number(amount.toFixed(6));
}

export function readStoredCurrencyPreference(
  allowedCodes: CurrencyCode[] = supportedCurrencyCodes
) {
  if (typeof window === "undefined") {
    return null;
  }

  const storedCode = window.localStorage.getItem(currencyPreferenceStorageKey);

  if (!storedCode || !allowedCodes.includes(storedCode as CurrencyCode)) {
    return null;
  }

  return storedCode as CurrencyCode;
}

export function persistCurrencyPreference(code: CurrencyCode) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(currencyPreferenceStorageKey, code);
}

export function detectCurrencyFromBrowser(
  allowedCodes: CurrencyCode[] = supportedCurrencyCodes,
  fallbackCode: CurrencyCode = defaultCurrencyCode
) {
  const allowedSet = new Set(allowedCodes);

  if (typeof navigator !== "undefined") {
    const locales = [...(navigator.languages || []), navigator.language].filter(Boolean);

    for (const locale of locales) {
      const region = getRegionFromLocale(locale);
      const currencyCode = region ? regionToCurrencyCode[region] : undefined;

      if (currencyCode && allowedSet.has(currencyCode)) {
        return currencyCode;
      }
    }
  }

  if (typeof Intl !== "undefined") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone) {
      const matchedTimeZone = timezoneCurrencyMatchers.find(({ pattern }) =>
        pattern.test(timeZone)
      );

      if (matchedTimeZone && allowedSet.has(matchedTimeZone.code)) {
        return matchedTimeZone.code;
      }

      if (timeZone.startsWith("America/") && allowedSet.has("USD")) {
        return "USD";
      }
    }
  }

  if (allowedSet.has(fallbackCode)) {
    return fallbackCode;
  }

  return allowedCodes[0] || defaultCurrencyCode;
}
