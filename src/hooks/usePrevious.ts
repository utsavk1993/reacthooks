/**
 * A custom React hook that stores the previous value of a given state or prop.
 * It returns `undefined` on the first render, and the previous value on subsequent renders.
 *
 * @template T - The type of the value being tracked.
 * @param {T} value - The current value to track.
 * @returns {(T | undefined)} The previous value, or `undefined` if it's the first render.
 *
 * @example
 * // Example usage in a functional component:
 * import React, { useState } from "react";
 * import usePrevious from "./usePrevious";
 *
 * function ExampleComponent() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current count: {count}</p>
 *       <p>Previous count: {prevCount ?? "None"}</p>
 *       <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 */

import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
