import { useState, useCallback } from "react";

type UseCounterReturnType = [number, () => void, () => void, () => void];

function useCounter(
  initialValue: number = 0,
  step: number = 1,
): UseCounterReturnType {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCount((prev) => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return [count, increment, decrement, reset];
}

export default useCounter;
