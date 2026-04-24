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
  const siteKey = String(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "");

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current || isRenderingRef.current) return;

    try {
      isRenderingRef.current = true;
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
        "error-callback": () => {
          onError?.();
        },
        theme: "light",
        size: "invisible",
        appearance: "always",
      });
      widgetIdRef.current = id;
    } catch (err) {
      console.error("🛡️ [Turnstile Render Error]", err);
    } finally {
      isRenderingRef.current = false;
    }
  }, [siteKey, onVerify, onError]);

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
