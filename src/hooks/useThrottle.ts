import { useState, useEffect, useRef } from "react";

/**
 * A custom React hook to throttle a value.
 * @param value - The value to be throttled.
 * @param delay - The throttle delay in milliseconds. Defaults to 300ms.
 * @returns The throttled value.
 */
function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      // Update immediately if the delay has passed
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      // Schedule update when the delay is fulfilled
      const remainingTime = delay - timeSinceLastExecution;

      const timeout = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, remainingTime);

      return () => clearTimeout(timeout);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
