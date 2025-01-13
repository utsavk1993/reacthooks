import { renderHook, act } from "@testing-library/react";
import useThrottle from "@/hooks/useThrottle";

jest.useFakeTimers();

describe("useThrottle hook: unit tests", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useThrottle("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should throttle updates to the value", () => {
    const { result } = renderHook(() => useThrottle("initial", 500));

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("initial");
  });

  it("should only update the throttled value once within the throttle delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: "initial" } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "first update" });
    rerender({ value: "second update" });

    act(() => jest.advanceTimersByTime(400));
    expect(result.current).toBe("initial");

    act(() => jest.advanceTimersByTime(100));
    expect(result.current).toBe("second update");
  });

  it("should update value after the throttle delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: "initial" } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "update after throttle" });

    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("initial");

    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe("update after throttle");
  });

  it("should work with numeric values", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
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
      ({ value }: { value: string }) => useThrottle(value),
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
