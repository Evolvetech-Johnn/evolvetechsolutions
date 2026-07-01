"use client";

import { useState, useEffect, useRef } from "react";

export interface UseLiveMetricOptions {
  /** Minimum value the metric can reach */
  min: number;
  /** Maximum value the metric can reach */
  max: number;
  /** Initial value to display before first tick */
  initial: number;
  /**
   * Base interval in milliseconds between updates.
   * Actual intervals vary by ±20 % so ticks never look synchronised.
   */
  intervalMs: number;
  /** Optional unit suffix — purely for display convenience */
  unit?: string;
}

export interface UseLiveMetricResult {
  value: number;
  /** Monotonically-increasing key — use as AnimatePresence `key` prop */
  key: number;
}

/**
 * Provides a slowly-oscillating numeric metric that changes at irregular
 * intervals within the supplied [min, max] range.
 *
 * Features:
 * - Interval jitter (±20 %) so two metrics never tick at the exact same time.
 * - Smooth step: new value is a random pick within ±1 step of the current
 *   value, biased toward the centre of the range — prevents the number from
 *   drifting to the extremes and staying there.
 * - Respects `prefers-reduced-motion`: when enabled the value stays fixed at
 *   `initial` and never updates.
 *
 * @param options - Configuration options for the metric oscillation.
 * @returns Current value and a monotonic key for AnimatePresence.
 */
export function useLiveMetric({
  min,
  max,
  initial,
  intervalMs,
  unit: _unit,
}: UseLiveMetricOptions): UseLiveMetricResult {
  const [value, setValue] = useState(initial);
  const [key, setKey] = useState(0);

  // Read the media query once so we don't start timers when motion is reduced
  const reducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
  }, []);

  const currentValue = useRef(initial);

  useEffect(() => {
    if (reducedMotion.current) return; // static — no timer

    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      // Jitter: actual wait is intervalMs ± 20 %
      const jitter = intervalMs * 0.2;
      const wait = intervalMs + (Math.random() * jitter * 2 - jitter);

      timeoutId = setTimeout(() => {
        const range = max - min;
        const step = Math.max(1, Math.round(range * 0.12)); // ~12 % of range
        const center = (min + max) / 2;

        // Bias: pull toward centre so metric doesn't drift to extremes
        const bias = (center - currentValue.current) * 0.25;
        const delta = (Math.random() * step * 2 - step) + bias;
        const next = Math.round(
          Math.min(max, Math.max(min, currentValue.current + delta))
        );

        currentValue.current = next;
        setValue(next);
        setKey((k) => k + 1);

        scheduleNext();
      }, wait);
    }

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [min, max, intervalMs]);

  return { value, key };
}
