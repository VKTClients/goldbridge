"use client";

import { useEffect } from "react";

export default function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      attempts++;
      const el = document.querySelector(hash);
      if (el) {
        // Offset for fixed navbar + ticker (~120px)
        const offset = 120;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < maxAttempts) {
        // Retry every 300ms until element is found
        setTimeout(tryScroll, 300);
      }
    };

    // Start trying after PageLoader finishes (~2s)
    setTimeout(tryScroll, 2000);
  }, []);

  return null;
}
