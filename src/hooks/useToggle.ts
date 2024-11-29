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

import { useState, useCallback } from 'react';

type UseToggleReturnType = [boolean, () => void, (value: boolean) => void];

function useToggle(initialValue: boolean = false): UseToggleReturnType {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setToggle = useCallback((value: boolean) => setValue(value), []);

  return [value, toggle, setToggle];
}
  
export default useToggle;
