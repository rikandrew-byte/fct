"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Cloudflare Turnstile ??Robust Invisible Widget
 * Optimized for multiple widgets on the same page.
 */

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isRenderingRef = useRef(false);

  // ?p ki廙 String tuy廙 ?廙 ?廙?tr獺nh l廙 "got object"
  // ?p ki廙 String tuy廙 ?廙 v? log ?廙?MASTER ki廙 tra
  const rawKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const siteKey = typeof rawKey === 'string' ? rawKey : "";

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current || isRenderingRef.current) return;

    if (!siteKey) {
      console.error("?儭?[Turnstile] CRITICAL: Site Key is empty or invalid type:", typeof rawKey);
      return;
    }

    try {
      isRenderingRef.current = true;
      
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
        "error-callback": () => {
          console.error("?儭?[Turnstile] Verification Error. Please check Site Key and Domain settings.");
          // Ng廕眩 reset t廙??廙g ?廙?tr獺nh v簷ng l廕搆 v繫 t廕要 khi Site Key sai
          onError?.();
        },
        theme: "light",
        size: "flexible",
        appearance: "always",
      });
      widgetIdRef.current = id;
    } catch (err) {
      console.error("?儭?[Turnstile Render Error]", err);
    } finally {
      isRenderingRef.current = false;
    }
  }, [siteKey, rawKey, onVerify, onError]);

  useEffect(() => {
    if (!siteKey) {
      console.warn("?儭?[Turnstile] Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY.");
      return;
    }

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const onScriptLoad = () => {
      // Small delay to ensure turnstile is fully ready in the window
      setTimeout(renderWidget, 100);
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = onScriptLoad;
      document.head.appendChild(script);
    } else {
      if (window.turnstile) {
        renderWidget();
      } else {
        script.addEventListener("load", onScriptLoad);
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  return (
    <div 
      ref={containerRef} 
      className="cf-turnstile-container" 
      style={{ minHeight: "1px", minWidth: "1px" }} 
    />
  );
}
