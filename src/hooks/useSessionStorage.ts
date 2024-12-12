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

import { useState, useCallback } from "react";

type UseSessionStorageReturnType<T> = [T, (value: T) => void, () => void];

function useSessionStorage<T>(
  key: string,
  initialValue: T,
): UseSessionStorageReturnType<T> {
  const [value, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error reading from sessionStorage", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error setting sessionStorage value", error);
      }
    },
    [key],
  );

  const resetValue = useCallback(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(initialValue));
      setStoredValue(initialValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error resetting sessionStorage value", error);
    }
  }, [key, initialValue]);

  return [value, setValue, resetValue];
}

export default useSessionStorage;
