import { renderHook, act } from "@testing-library/react";
import useDebounce from "@/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce hook: unit tests", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should update the debounced value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe("updated");
  });

  it("should reset the debounce timer if the value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "first update" });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: "second update" });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe("second update");
  });

  it("should work with numeric values", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 0 } },
    );

    expect(result.current).toBe(0);

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(42);
  });

  it("should use a default delay of 300ms if no delay is provided", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "updated" });

    act(() => {
      jest.advanceTimersByTime(299);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe("updated");
  });
});
