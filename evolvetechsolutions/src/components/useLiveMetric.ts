"use client";

import { useState, useEffect, useRef } from "react";

export interface UseLiveMetricOptions {
  min: number;
  max: number;
  initial: number;
  intervalMs: number;
}

export function useLiveMetric({ min, max, initial, intervalMs }: UseLiveMetricOptions) {
  const [value, setValue] = useState(initial);
  const [key, setKey] = useState(0);
  const currentValue = useRef(initial);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const range = max - min;
      const step = Math.max(1, Math.round(range * 0.12));
      const center = (min + max) / 2;
      
      const bias = (center - currentValue.current) * 0.25;
      let delta = (Math.random() * step * 2 - step) + bias;
      
      if (Math.abs(Math.round(delta)) === 0) {
        delta = Math.random() > 0.5 ? 1 : -1;
      }

      let next = Math.round(
        Math.min(max, Math.max(min, currentValue.current + delta))
      );
      
      if (next === currentValue.current) {
        if (next >= max) next = max - 1;
        else if (next <= min) next = min + 1;
        else next = next + (Math.random() > 0.5 ? 1 : -1);
      }

      currentValue.current = next;
      setValue(next);
      setKey((k) => k + 1);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [min, max, intervalMs]);

  return { value, key };
}
