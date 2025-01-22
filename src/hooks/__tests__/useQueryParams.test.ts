import { act, renderHook } from "@testing-library/react";
import useQueryParams from "@/hooks/useQueryParams";

describe("useQueryParams hook: unit tests", () => {
  it("should initialize with the default query parameters", () => {
    // Mock the location object with a search property
    const location = { search: "" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an empty search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the queryParams object from the result
    const { queryParams } = result.current;

    // Assert that the queryParams object is empty
    expect(queryParams.toString()).toBe("");
  });

  it("should update the query parameters with the setQueryParams function", () => {
    // Mock the location object with a search property
    const location = { search: "" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an empty search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the setQueryParams function from the result
    const { setQueryParams } = result.current;

    // Update the query parameters with the key-value pair "search=react"
    act(() => {
      setQueryParams({ search: "react" });
    });

    // Assert that the setLocation function was called with the updated query parameters
    expect(setLocation).toHaveBeenCalledWith("?search=react");
  });

  it("should remove a query parameter if the value is `undefined`", () => {
    // Mock the location object with a search property
    const location = { search: "?search=react" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an initial search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the setQueryParams function from the result
    const { setQueryParams } = result.current;

    // Update the query parameters with the key-value pair "search=undefined"
    act(() => {
      setQueryParams({ search: undefined });
    });

    // Assert that the setLocation function was called with the updated query parameters
    expect(setLocation).toHaveBeenCalledWith("?");
  });

  it("should update multiple query parameters with the setQueryParams function", () => {
    // Mock the location object with a search property
    const location = { search: "?search=react" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an initial search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the setQueryParams function from the result
    const { setQueryParams } = result.current;

    // Update the query parameters with the key-value pairs "search=hooks" and "page=1"
    act(() => {
      setQueryParams({ search: "hooks", page: "1" });
    });

    // Assert that the setLocation function was called with the updated query parameters
    expect(setLocation).toHaveBeenCalledWith("?search=hooks&page=1");
  });

  it("should update the query parameters with the setQueryParams function and remove undefined values", () => {
    // Mock the location object with a search property
    const location = { search: "?search=react&page=1" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an initial search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the setQueryParams function from the result
    const { setQueryParams } = result.current;

    // Update the query parameters with the key-value pairs "search=hooks" and "page=undefined"
    act(() => {
      setQueryParams({ search: "hooks", page: undefined });
    });

    // Assert that the setLocation function was called with the updated query parameters
    expect(setLocation).toHaveBeenCalledWith("?search=hooks");
  });

  it("should update the query parameters with the setQueryParams function and remove empty values", () => {
    // Mock the location object with a search property
    const location = { search: "?search=react&page=1" };

    // Mock the setLocation function
    const setLocation = jest.fn();

    // Render the hook with an initial search query
    const { result } = renderHook(() => useQueryParams(location, setLocation));

    // Destructure the setQueryParams function from the result
    const { setQueryParams } = result.current;

    // Update the query parameters with the key-value pairs "search=hooks" and "page="
    act(() => {
      setQueryParams({ search: "hooks", page: "" });
    });

    // Assert that the setLocation function was called with the updated query parameters
    expect(setLocation).toHaveBeenCalledWith("?search=hooks");
  });
});
