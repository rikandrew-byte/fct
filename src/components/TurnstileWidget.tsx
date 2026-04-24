"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Cloudflare Turnstile — Robust Invisible Widget
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

  // Ép kiểu String tuyệt đối để tránh lỗi "got object"
  // Ép kiểu String tuyệt đối và log để MASTER kiểm tra
  const rawKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const siteKey = typeof rawKey === 'string' ? rawKey : "";

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current || isRenderingRef.current) return;

    if (!siteKey) {
      console.error("🛡️ [Turnstile] CRITICAL: Site Key is empty or invalid type:", typeof rawKey);
      return;
    }

    try {
      isRenderingRef.current = true;
      console.log("🛡️ [Turnstile] Attempting render with key:", siteKey.substring(0, 10) + "...");
      
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          console.log("🛡️ [Turnstile] Token generated successfully!");
          onVerify(token);
        },
        "error-callback": () => {
          console.error("🛡️ [Turnstile] Verification Error.");
          onError?.();
        },
        theme: "light",
        size: "managed", // Chuyển sang Managed để Cloudflare tự điều tiết (Ổn định hơn)
        appearance: "always",
      });
      widgetIdRef.current = id;
    } catch (err) {
      console.error("🛡️ [Turnstile Render Error]", err);
    } finally {
      isRenderingRef.current = false;
    }
  }, [siteKey, rawKey, onVerify, onError]);

  useEffect(() => {
    if (!siteKey) {
      console.warn("🛡️ [Turnstile] Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY.");
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
