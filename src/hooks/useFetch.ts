/**
 * A custom React hook to fetch data from an API and handle loading and error states.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - The options (optional) to pass to the fetch function.
 * @returns {Object} - Returns an object containing:
 *   - `data` {T | null}: The data fetched from the API.
 *   - `isLoading` {boolean}: A boolean indicating if the data is being fetched.
 *   - `error` {string | null}: An error message if the fetch operation fails.
 *
 * @example
 * const { data, isLoading, error } = useFetch("https://api.example.com/data");
 * console.log(data); // The fetched data
 * console.log(isLoading); // true while fetching, false when done
 * console.log(error); // null if no error, or an error message
 */

import { useState, useEffect } from "react";

export const unknownErrorMessage = "An unknown error occurred";

// Return type of the useFetch hook
type UseFetchReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useFetch<T>(
  url: string,
  options?: RequestInit,
): UseFetchReturnType<T> {
  const [data, setData] = useState<T | null>(null); // Initial data is null
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initial loading state is true
  const [error, setError] = useState<string | null>(null); // Initial error state is null

  // Fetch data when the URL or options change
  useEffect(() => {
    let isCancelled: boolean = false; // Used to prevent setting state if component unmounts

    // Fetch data from the URL using the specified options
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true
      setError(null); // Reset the error state

      try {
        const response = await fetch(url, options); // Fetch data from the URL
        // Throw an error with statusText if the response is not OK
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: T = await response.json(); // Parse the JSON response

        // Set the data if the component is still mounted
        if (!isCancelled) {
          setData(result);
        }
      } catch (err: unknown) {
        // Set the error message if the component is still mounted
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : unknownErrorMessage);
        }
      } finally {
        // Set loading to false if the component is still mounted
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function to cancel the fetch request
    return () => {
      isCancelled = true; // Prevents setting state if component unmounts.
    };
  }, [url, options]);

  return { data, isLoading, error }; // Return the data, loading state, and error message
}

export default useFetch;
