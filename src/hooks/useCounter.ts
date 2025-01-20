/**
 * A custom React hook to manage a counter with increment, decrement, and reset functionality.
 *
 * @param {number} [initialValue = 0] - The initial value of the counter.
 * @param {number} [step = 1] - The step size by which the counter is incremented or decremented.
 * @returns {[number, () => void, () => void, () => void]} - Returns a tuple:
 *   - `count` (number): The current value of the counter.
 *   - `increment` (function): A function to increase the counter by the specified step.
 *   - `decrement` (function): A function to decrease the counter by the specified step.
 *   - `reset` (function): A function to reset the counter to its initial value.
 *
 * @example
 * const [count, increment, decrement, reset] = useCounter(10, 2);
 *
 * increment(); // count becomes 12
 * decrement(); // count becomes 10
 * reset();     // count becomes 10
 */

import { useState, useCallback } from "react";

type UseCounterReturnType = [number, () => void, () => void, () => void];

export function useCounter(
  initialValue: number = 0,
  step: number = 1,
): UseCounterReturnType {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCount((prev) => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return [count, increment, decrement, reset];
}
