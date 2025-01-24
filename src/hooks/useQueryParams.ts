/**
 * A custom React hook to manage query parameters in the URL with getter and setter functionality.
 *
 * @param {Object} location - The current location object containing the `search` property.
 * @param {string} location.search - The query string part of the URL.
 * @param {function(string): void} setLocation - A function to update the location with new query parameters.
 * @returns {Object} - Returns an object containing:
 *   - `queryParams` {URLSearchParams}: The current query parameters.
 *   - `setQueryParams` {function(Object<string, string | undefined): void}: A function to update the query parameters.
 *
 * @example
 * // Assuming the URL is "http://localhost:3000/?search=react"
 * const { queryParams, setQueryParams } = useQueryParams(location, setLocation);
 * console.log(queryParams.get("search")); // "react"
 * setQueryParams({ search: "hooks" });
 * console.log(queryParams.get("search")); // "hooks"
 */

import { useMemo } from "react";

// Return type of the useQueryParams hook
type UseQueryParamsReturnType = {
  queryParams: URLSearchParams;
  setQueryParams: (params: Record<string, string | undefined>) => void;
};

function useQueryParams(
  location: { search: string },
  setLocation: (path: string) => void,
): UseQueryParamsReturnType {
  // Memoize the URLSearchParams object to avoid re-creating it on every render
  const queryParams: URLSearchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // Function to update the query parameters in the URL
  const setQueryParams = (params: Record<string, string | undefined>): void => {
    const updatedParams: URLSearchParams = new URLSearchParams(queryParams); // Clone the existing query parameters

    // Update the query parameters with the new values
    Object.entries(params).forEach(([key, value]) => {
      // If the value is `undefined` or empty, remove the key from the query parameters
      if (value === undefined || value === "") {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value); // Otherwise, set the key-value pair
      }
    });

    // Update the URL with the new query parameters
    setLocation(`?${updatedParams.toString()}`);
  };

  return { queryParams, setQueryParams }; // Return the query parameters and the setter function
}

export default useQueryParams;
