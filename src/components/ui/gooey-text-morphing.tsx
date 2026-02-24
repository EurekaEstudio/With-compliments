"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
    texts: string[];
    morphTime?: number;
    cooldownTime?: number;
    className?: string;
    textClassName?: string;
}

// Detect mobile + reduced-motion once at module level (zero re-computation)
const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * GooeyText — Morphing text with SVG gooey filter on desktop.
 * On mobile / reduced-motion: uses a CSS keyframe fade-cycle instead of
 * a requestAnimationFrame loop, keeping the visual alive with zero JS cost.
 */
export function GooeyText({
    texts,
    morphTime = 1,
    cooldownTime = 0.25,
    className,
    textClassName,
}: GooeyTextProps) {
    const text1Ref = React.useRef<HTMLSpanElement>(null);
    const text2Ref = React.useRef<HTMLSpanElement>(null);
    const rafRef = React.useRef<number>(0);

    // Use the longest text for placeholder so shorter texts never cause CLS
    const longestText = React.useMemo(
        () => texts.reduce((a, b) => (a.length >= b.length ? a : b)),
        [texts]
    );

    // ─── Mobile / Reduced-motion: CSS-only rotating text ────────────────────
    // We inject a <style> block with a keyframe that cycles through every text.
    // Zero requestAnimationFrame, zero JS per frame.
    const [mobileIndex, setMobileIndex] = React.useState(0);
    const mobileTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);

    React.useEffect(() => {
        if (!isTouchDevice && !prefersReducedMotion) return;

        // Simple interval-based rotation for mobile/reduced-motion
        const cycleDuration = (morphTime + cooldownTime) * 1000;
        mobileTimer.current = setInterval(() => {
            setMobileIndex((prev) => (prev + 1) % texts.length);
        }, Math.max(cycleDuration, 2000)); // Minimum 2s per word

        return () => {
            if (mobileTimer.current) clearInterval(mobileTimer.current);
        };
    }, [texts, morphTime, cooldownTime]);

    // ─── Desktop: full gooey RAF loop ────────────────────────────────────────
    React.useEffect(() => {
        if (isTouchDevice || prefersReducedMotion) return;

        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        const setMorph = (fraction: number) => {
            if (text1Ref.current && text2Ref.current) {
                text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
                fraction = 1 - fraction;
                text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            }
        };

        const doCooldown = () => {
            morph = 0;
            if (text1Ref.current && text2Ref.current) {
                text2Ref.current.style.filter = "";
                text2Ref.current.style.opacity = "100%";
                text1Ref.current.style.filter = "";
                text1Ref.current.style.opacity = "0%";
            }
        };

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;
            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }
            setMorph(fraction);
        };

        function animate() {
            rafRef.current = requestAnimationFrame(animate);
            const newTime = new Date();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;
            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex = (textIndex + 1) % texts.length;
                    if (text1Ref.current && text2Ref.current) {
                        text1Ref.current.textContent = texts[textIndex % texts.length];
                        text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
                    }
                }
                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();
        return () => cancelAnimationFrame(rafRef.current);
    }, [texts, morphTime, cooldownTime]);

    // ─── Mobile render: simple fade between texts ────────────────────────────
    if (isTouchDevice || prefersReducedMotion) {
        return (
            <div className={cn("relative inline-block align-baseline", className)}>
                {/* Invisible placeholder reserves space for the widest text */}
                <span
                    className={cn("inline-block select-none opacity-0", textClassName)}
                    aria-hidden="true"
                >
                    {longestText}
                </span>
                <span
                    className={cn(
                        "absolute inset-0 flex items-center select-none whitespace-nowrap",
                        "transition-opacity duration-700",
                        textClassName
                    )}
                    // Accessible: screen readers see all texts as a list, but visually
                    // only one shows at a time
                    aria-live="polite"
                >
                    {texts[mobileIndex]}
                </span>
            </div>
        );
    }

    // ─── Desktop render: full gooey SVG filter morphing ─────────────────────
    return (
        <div className={cn("relative inline-block align-baseline", className)}>
            <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Invisible placeholder — widest text reserves space (prevents CLS) */}
            <span
                className={cn("inline-block select-none opacity-0", textClassName)}
                aria-hidden="true"
            >
                {longestText}
            </span>

            <div
                className="absolute inset-0 flex items-center"
                style={{ filter: "url(#threshold)" }}
            >
                <span
                    ref={text1Ref}
                    className={cn(
                        "absolute inline-block select-none whitespace-nowrap",
                        textClassName
                    )}
                />
                <span
                    ref={text2Ref}
                    className={cn(
                        "absolute inline-block select-none whitespace-nowrap",
                        textClassName
                    )}
                />
            </div>
        </div>
    );
}
