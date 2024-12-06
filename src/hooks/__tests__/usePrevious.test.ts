import { act, renderHook } from "@testing-library/react";
import usePrevious from "@/hooks/usePrevious";

describe("useCounter hook: unit tests", () => {
  it("should return the previous value", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: 1 });
    });

    expect(result.current).toBe(0);

    act(() => {
      rerender({ value: 2 });
    });

    expect(result.current).toBe(1);
  });

  it("should return the same value if the value is same after rerender", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: 0 });
    });

    expect(result.current).toBe(0);
  });
});
