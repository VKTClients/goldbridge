"use client";

import { useEffect, useState } from "react";
import {
  CurrencyCode,
  defaultCurrencyCode,
  detectCurrencyFromBrowser,
  persistCurrencyPreference,
  readStoredCurrencyPreference,
  supportedCurrencyCodes,
} from "@/lib/currency";

type CurrencyPreferenceSource = "saved" | "location" | "default";

export function usePreferredCurrency(
  allowedCodes: CurrencyCode[] = supportedCurrencyCodes,
  fallbackCode: CurrencyCode = defaultCurrencyCode
) {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(fallbackCode);
  const [source, setSource] = useState<CurrencyPreferenceSource>("default");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedCurrency = readStoredCurrencyPreference(allowedCodes);

    if (storedCurrency) {
      setCurrencyCodeState(storedCurrency);
      setSource("saved");
      setIsReady(true);
      return;
    }

    const detectedCurrency = detectCurrencyFromBrowser(allowedCodes, fallbackCode);
    setCurrencyCodeState(detectedCurrency);
    setSource(detectedCurrency === fallbackCode ? "default" : "location");
    setIsReady(true);
  }, [allowedCodes, fallbackCode]);

  const setCurrencyCode = (nextCurrencyCode: CurrencyCode) => {
    if (!allowedCodes.includes(nextCurrencyCode)) {
      return;
    }

    setCurrencyCodeState(nextCurrencyCode);
    setSource("saved");
    setIsReady(true);
    persistCurrencyPreference(nextCurrencyCode);
  };

  return {
    currencyCode,
    setCurrencyCode,
    source,
    isReady,
  };
}
