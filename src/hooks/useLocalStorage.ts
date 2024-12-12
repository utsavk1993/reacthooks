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

import { useState, useCallback } from "react";

type UseLocalStorageReturnType<T> = [T, (value: T) => void, () => void];

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturnType<T> {
  const [value, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error setting localStorage value", error);
      }
    },
    [key],
  );

  const resetValue = useCallback(() => {
    try {
      localStorage.setItem(key, JSON.stringify(initialValue));
      setStoredValue(initialValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error resetting localStorage value", error);
    }
  }, [key, initialValue]);

  return [value, setValue, resetValue];
}

export default useLocalStorage;
