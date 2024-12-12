import { act, renderHook } from "@testing-library/react";
import useSessionStorage from "@/hooks/useSessionStorage";

describe("useSessionStorage hook: unit tests", () => {
  afterEach(() => {
    // Clear sessionStorage after each test
    window.sessionStorage.clear();
    // Restore all mocks
    jest.restoreAllMocks();
  });

  it("should initialize with the default value", () => {
    // Render the hook with an initial value of "light"
    const { result } = renderHook(() => useSessionStorage("theme", "light"));

    // Destructure the value from the result
    const [value] = result.current;

    // Assert that the value is "light"
    expect(value).toBe("light");
  });

  it("should return the stored value from sessionStorage", () => {
    // Set an item in sessionStorage with the key "theme" and value "dark"
    window.sessionStorage.setItem("theme", JSON.stringify("dark"));

    // Render the hook with an initial value of "light"
    const { result } = renderHook(() => useSessionStorage("theme", "light"));

    // Destructure the value from the result
    const [value] = result.current;

    // Assert that the value is "dark"
    expect(value).toBe("dark");
  });

  it("should set the value using the setValue function", () => {
    // Render the hook with an initial value of "light"
    const { result } = renderHook(() => useSessionStorage("theme", "light"));

    // Destructure the setValue function from the result
    const [, setValue] = result.current;

    // Update the value to "dark"
    act(() => {
      setValue("dark");
    });

    // Assert that the value is updated to "dark"
    expect(result.current[0]).toBe("dark");
  });

  it("should reset the value using the resetValue function", () => {
    // Render the hook with an initial value of "light"
    const { result } = renderHook(() => useSessionStorage("theme", "light"));

    // Destructure the resetValue function from the result
    const [, , resetValue] = result.current;

    // Update the value to "dark"
    act(() => {
      resetValue();
    });

    // Assert that the value is reset to the initial value of "light"
    expect(result.current[0]).toBe("light");
  });

  it("should handle errors when reading from sessionStorage", () => {
    // Mock sessionStorage.getItem to throw an error
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockImplementation(() => {
        throw new Error("Error reading from sessionStorage");
      });

    // Mock console.error to avoid displaying errors in the console during tests
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Render the hook
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "defaultValue"),
    );

    // Assert that the value falls back to the initial value
    expect(result.current[0]).toBe("defaultValue");

    // Assert that console.error is called with the correct error message
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Error reading from sessionStorage"),
      expect.anything(),
    );

    // Cleanup mocks
    consoleErrorMock.mockRestore();
  });

  it("should handle errors when writing to sessionStorage", () => {
    // Mock sessionStorage.setItem to throw an error
    jest
      .spyOn(window.sessionStorage.__proto__, "setItem")
      .mockImplementation(() => {
        throw new Error("Error setting sessionStorage value");
      });

    // Mock console.error to avoid displaying errors in the console during tests
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Render the hook
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "defaultValue"),
    );

    // Destructure the setValue function from the result
    const [, setValue] = result.current;

    // Update the value to trigger the error
    act(() => {
      setValue("newValue");
    });

    // Assert that the value remains unchanged
    expect(result.current[0]).toBe("defaultValue");

    // Assert that console.error is called with the correct error message
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Error setting sessionStorage value"),
      expect.anything(),
    );

    // Cleanup mocks
    consoleErrorMock.mockRestore();
  });

  it("should handle errors when resetting the value", () => {
    // Mock sessionStorage.setItem to throw an error
    jest
      .spyOn(window.sessionStorage.__proto__, "setItem")
      .mockImplementation(() => {
        throw new Error("Error resetting sessionStorage value");
      });

    // Mock console.error to avoid displaying errors in the console during tests
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Render the hook
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "defaultValue"),
    );

    // Destructure the resetValue function from the result
    const [, , resetValue] = result.current;

    // Reset the value to trigger the error
    act(() => {
      resetValue();
    });

    // Assert that the value remains unchanged
    expect(result.current[0]).toBe("defaultValue");

    // Assert that console.error is called with the correct error message
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Error resetting sessionStorage value"),
      expect.anything(),
    );

    // Cleanup mocks
    consoleErrorMock.mockRestore();
  });

  it("should return the same setValue function when the key is the same", () => {
    // Render the hook with a key of "theme"
    const { result, rerender } = renderHook(
      ({ key }) => useSessionStorage(key, "initialValue"),
      {
        initialProps: { key: "theme" },
      },
    );

    // Destructure the setValue function from the result
    const [, setValue] = result.current;

    // Rerender the hook with the same key
    rerender({ key: "theme" });

    // Destructure the setValue function again from the result
    const [, newSetValue] = result.current;

    // Assert that the setValue function remains the same
    expect(setValue).toBe(newSetValue);
  });

  it("should return a new setValue function when the key changes", () => {
    // Render the hook with a key of "theme"
    const { result, rerender } = renderHook(
      ({ key }) => useSessionStorage(key, "initialValue"),
      {
        initialProps: { key: "theme" },
      },
    );

    // Destructure the setValue function from the result
    const [, setValue] = result.current;

    // Rerender the hook with a different key
    rerender({ key: "newKey" });

    // Destructure the setValue function again from the result
    const [, newSetValue] = result.current;

    // Assert that the setValue function is different
    expect(setValue).not.toBe(newSetValue);
  });

  it("should return the same resetValue function when the key is the same", () => {
    // Render the hook with a key of "theme"
    const { result, rerender } = renderHook(
      ({ key }) => useSessionStorage(key, "initialValue"),
      {
        initialProps: { key: "theme" },
      },
    );

    // Destructure the resetValue function from the result
    const [, , resetValue] = result.current;

    // Rerender the hook with the same key
    rerender({ key: "theme" });

    // Destructure the resetValue function again from the result
    const [, , newResetValue] = result.current;

    // Assert that the resetValue function remains the same
    expect(resetValue).toBe(newResetValue);
  });

  it("should return a new resetValue function when the key changes", () => {
    // Render the hook with a key of "theme"
    const { result, rerender } = renderHook(
      ({ key }) => useSessionStorage(key, "initialValue"),
      {
        initialProps: { key: "theme" },
      },
    );

    // Destructure the resetValue function from the result
    const [, , resetValue] = result.current;

    // Rerender the hook with a different key
    rerender({ key: "newKey" });

    // Destructure the resetValue function again from the result
    const [, , newResetValue] = result.current;

    // Assert that the resetValue function is different
    expect(resetValue).not.toBe(newResetValue);
  });

  it("should return the same storedValue when the key is the same", () => {
    // Render the hook with a key of "theme"
    const { result, rerender } = renderHook(
      ({ key }) => useSessionStorage(key, "initialValue"),
      {
        initialProps: { key: "theme" },
      },
    );

    // Destructure the storedValue from the result
    const [storedValue] = result.current;

    // Rerender the hook with the same key
    rerender({ key: "theme" });

    // Destructure the storedValue again from the result
    const [newStoredValue] = result.current;

    // Assert that the storedValue remains the same
    expect(storedValue).toBe(newStoredValue);
  });
});
