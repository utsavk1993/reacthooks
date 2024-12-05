import { act, renderHook } from "@testing-library/react";
import useToggle from "@/hooks/useToggle";

describe("useToggle hook: unit tests", () => {
  it("should initialize with the default value (false)", () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;

    expect(value).toBe(false);
    expect.assertions(1);
  });

  it("should initialize with the provided value (true)", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;

    expect(value).toBe(true);
  });

  it("should toggle the value using the toggle function", () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;

    act(() => {
      toggle(); // Toggles false -> true
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggle(); // Toggles true -> false
    });

    expect(result.current[0]).toBe(false);
  });

  it("should set the value explicitly using setToggle", () => {
    const { result } = renderHook(() => useToggle());
    const [, , setToggle] = result.current;

    act(() => {
      setToggle(true); // Sets value to true
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      setToggle(false); // Sets value to false
    });

    expect(result.current[0]).toBe(false);
  });

  it("should maintain the same toggle and setToggle references across renders", () => {
    const { result, rerender } = renderHook(() => useToggle());
    const [, toggleBefore, setToggleBefore] = result.current;

    rerender();

    const [, toggleAfter, setToggleAfter] = result.current;

    expect(toggleBefore).toBe(toggleAfter);
    expect(setToggleBefore).toBe(setToggleAfter);
  });
});
