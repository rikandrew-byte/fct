"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Cloudflare Turnstile — Invisible Widget
 * Renders an invisible CAPTCHA that automatically verifies the user.
 * The token is passed to the parent via onVerify callback.
 * 
 * Requires NEXT_PUBLIC_TURNSTILE_SITE_KEY env variable.
 */

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        onVerify(token);
      },
      "error-callback": () => {
        onError?.();
      },
      theme: "light",
      size: "invisible",        
      appearance: "always", // Hiện cái badge nhỏ ở góc để MASTER kiểm tra
    });
  }, [siteKey, onVerify, onError]);

  useEffect(() => {
    if (!siteKey) return; // Skip if no site key configured

    // Load Turnstile script once
    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;

      window.onTurnstileLoad = () => {
        scriptLoadedRef.current = true;
        renderWidget();
      };

      document.head.appendChild(script);
    } else if (window.turnstile) {
      // Script already loaded
      renderWidget();
    }

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  if (!siteKey) return null; // Graceful fallback — no widget if no key

  return <div ref={containerRef} className="cf-turnstile" />;
}
