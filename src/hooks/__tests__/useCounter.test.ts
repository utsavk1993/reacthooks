import { act, renderHook } from "@testing-library/react";
import useCounter from "../useCounter";

describe("useCounter hook: unit tests", () => {
  it("should initialize with the default value (0)", () => {
    const { result } = renderHook(() => useCounter());
    const [value] = result.current;

    expect(value).toBe(0);
    expect.assertions(1);
  });

  it("should initialize with the provided value (10)", () => {
    const { result } = renderHook(() => useCounter(10));
    const [value] = result.current;

    expect(value).toBe(10);
  });

  it("should increment the value by the step using the increment function", () => {
    const { result } = renderHook(() => useCounter(0, 5));
    const [, increment] = result.current;

    act(() => {
      increment(); // Increments by 5
    });

    expect(result.current[0]).toBe(5);

    act(() => {
      increment(); // Increments by 5
    });

    expect(result.current[0]).toBe(10);
  });

  it("should decrement the value by the step using the decrement function", () => {
    const { result } = renderHook(() => useCounter(10, 5));
    const [, , decrement] = result.current;

    act(() => {
      decrement(); // Decrements by 5
    });

    expect(result.current[0]).toBe(5);

    act(() => {
      decrement(); // Decrements by 5
    });

    expect(result.current[0]).toBe(0);
  });

  it("should reset the value to the initial value using the reset function", () => {
    const { result } = renderHook(() => useCounter(10, 5));
    const [, , , reset] = result.current;

    act(() => {
      reset(); // Resets to 10
    });

    expect(result.current[0]).toBe(10);
  });

  it("should maintain the same increment, decrement, and reset references across renders", () => {
    const { result, rerender } = renderHook(() => useCounter());
    const [, incrementBefore, decrementBefore, resetBefore] = result.current;

    rerender();

    const [, incrementAfter, decrementAfter, resetAfter] = result.current;

    expect(incrementBefore).toBe(incrementAfter);
    expect(decrementBefore).toBe(decrementAfter);
    expect(resetBefore).toBe(resetAfter);
  });

  it("should maintain the same increment, decrement, and reset references across renders with different values", () => {
    const { result, rerender } = renderHook(() => useCounter(10, 5));
    const [, incrementBefore, decrementBefore, resetBefore] = result.current;

    rerender();

    const [, incrementAfter, decrementAfter, resetAfter] = result.current;

    expect(incrementBefore).toBe(incrementAfter);
    expect(decrementBefore).toBe(decrementAfter);
    expect(resetBefore).toBe(resetAfter);
  });
});
