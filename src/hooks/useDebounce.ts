import { useState, useEffect } from "react";

/**
 * A custom React hook to debounce a value.
 * @param value - The value to be debounced.
 * @param delay - The debounce delay in milliseconds. Defaults to 300ms.
 * @returns The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup the timeout if value or delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
