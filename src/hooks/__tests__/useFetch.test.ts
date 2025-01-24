import { renderHook, waitFor } from "@testing-library/react";
import useFetch, { unknownErrorMessage } from "@/hooks/useFetch";

const mockData = { message: "Hello, World!" };
const mockApi = "https://api.example.com/data";
const mockOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ key: "value" }),
};

describe("useFetch hook: unit tests", () => {
  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
  });

  afterEach(() => {
    // Restore the fetch function
    jest.restoreAllMocks();
  });

  it("should fetch data successfully", async () => {
    // Render the hook with the specified URL to fetch data from the API endpoint
    const { result } = renderHook(() => useFetch(mockApi));

    // Destructure the values from the result
    const { isLoading, data, error } = result.current;

    // Assert that the initial state is correct
    expect(isLoading).toBe(true);
    expect(data).toBeNull();
    expect(error).toBeNull();

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the final state is correct
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    // Mock the fetch function to return an error
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    // Render the hook with the specified URL to fetch data from the API endpoint
    const { result } = renderHook(() => useFetch(mockApi));

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the error state is set correctly
    expect(result.current.error).toBe("Error: Not Found");
  });

  it("should handle errors gracefully", async () => {
    // Mock the fetch function to throw an error
    global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

    // Render the hook with the specified URL to fetch data from the API endpoint
    const { result } = renderHook(() => useFetch(mockApi));

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the error state is set correctly
    expect(result.current.error).toBe("Network Error");
  });

  it("should handle unknown errors gracefully", async () => {
    // Mock the fetch function to throw an unknown error
    global.fetch = jest.fn().mockRejectedValue("Unknown Error");

    // Render the hook with the specified URL to fetch data from the API endpoint
    const { result } = renderHook(() => useFetch(mockApi));

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the error state is set correctly
    expect(result.current.error).toBe(unknownErrorMessage);
  });

  it("should prevent setting state if component unmounts", async () => {
    // Mock the fetch function to return a delayed response
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
              }),
            1000,
          ),
        ),
    );

    // Render the hook with the specified URL to fetch data from the API endpoint
    const { result, unmount } = renderHook(() => useFetch(mockApi));

    // Unmount the component immediately
    unmount();

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    // Assert that the loading state is still true
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch data with custom options", async () => {
    // Render the hook with the specified URL and custom options
    const { result } = renderHook(() => useFetch(mockApi, mockOptions));

    // Assert that the initial state is correct
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert that the final state is correct
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });
});
