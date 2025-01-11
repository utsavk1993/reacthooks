/**
 * A custom React hook to manage a boolean state with toggle and set capabilities.
 * @param {boolean} [initialValue = false] - The initial state value for the toggle. Defaults to `false`.
 * @returns {[boolean, function, function]} An array containing:
 *  - The current boolean state.
 *  - A function to toggle the state between `true` and `false`.
 *  - A function to explicitly set the state to a specific boolean value.
 *
 * @example
 * const [value, toggle, setToggle] = useToggle(false);
 *
 * // Toggle the value
 * toggle(); // If `value` was `false`, it becomes `true`.
 *
 * // Set the value explicitly
 * setToggle(true); // Sets `value` to `true`.
 */
type UseToggleReturnType = [boolean, () => void, (value: boolean) => void];
declare function useToggle(initialValue?: boolean): UseToggleReturnType;

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
declare function usePrevious<T>(value: T): T | undefined;

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
type UseCounterReturnType = [number, () => void, () => void, () => void];
declare function useCounter(initialValue?: number, step?: number): UseCounterReturnType;

/**
 * A custom React hook to manage localStorage with getter, setter, and reset functionality.
 *
 * @param {string} key - The key to store and retrieve the value from localStorage.
 * @param {T} initialValue - The initial value to set if the key doesn't exist in localStorage.
 * @returns {[T, (value: T) => void, () => void]} - Returns a tuple:
 *   - `value` (T): The current value stored in localStorage.
 *   - `setValue` (function): A function to update the value in localStorage.
 *   - `resetValue` (function): A function to reset the value to the initial value.
 *
 * @example
 * const [theme, setTheme, resetTheme] = useLocalStorage("theme", "light");
 * console.log(theme); // "light"
 * setTheme("dark");
 * console.log(theme); // "dark"
 * resetTheme();
 * console.log(theme); // "light"
 */
type UseLocalStorageReturnType<T> = [T, (value: T) => void, () => void];
declare function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturnType<T>;

/**
 * A custom React hook to manage sessionStorage with getter, setter, and reset functionality.
 *
 * @param {string} key - The key to store and retrieve the value from sessionStorage.
 * @param {T} initialValue - The initial value to set if the key doesn't exist in sessionStorage.
 * @returns {[T, (value: T) => void, () => void]} - Returns a tuple:
 *   - `value` (T): The current value stored in sessionStorage.
 *   - `setValue` (function): A function to update the value in sessionStorage.
 *   - `resetValue` (function): A function to reset the value to the initial value.
 *
 * @example
 * const [theme, setTheme, resetTheme] = sessionStorage("theme", "light");
 * console.log(theme); // "light"
 * setTheme("dark");
 * console.log(theme); // "dark"
 * resetTheme();
 * console.log(theme); // "light"
 */
type UseSessionStorageReturnType<T> = [T, (value: T) => void, () => void];
declare function useSessionStorage<T>(key: string, initialValue: T): UseSessionStorageReturnType<T>;

export { useCounter, useLocalStorage, usePrevious, useSessionStorage, useToggle };
