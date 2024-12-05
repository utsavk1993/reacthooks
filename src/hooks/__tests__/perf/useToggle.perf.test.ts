/* Performance tests are dependent on the machine running the tests.
 * Please adjust the time accordingly.
 */

import { act, renderHook } from "@testing-library/react";
import useToggle from "@/hooks/useToggle";

describe("useToggle hook: performance tests", () => {
  it("should not have performance issues with toggle", () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        toggle();
      });
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(200);
  });

  it("should not have performance issues with setToggle", () => {
    const { result } = renderHook(() => useToggle());
    const [, , setToggle] = result.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        setToggle(true);
      });
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(200);
  });

  it("should not have performance issues with rerender", () => {
    const { rerender } = renderHook(() => useToggle());

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      rerender();
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(300);
  });

  it("should not have performance issues with multiple hooks and toggle", () => {
    const { result: result1 } = renderHook(() => useToggle());
    const { result: result2 } = renderHook(() => useToggle());
    const [, toggle1] = result1.current;
    const [, toggle2] = result2.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        toggle1();
        toggle2();
      });
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(200);
  });

  it("should not have performance issues with multiple hooks and rerender", () => {
    const { rerender: rerender1 } = renderHook(() => useToggle());
    const { rerender: rerender2 } = renderHook(() => useToggle());

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      rerender1();
      rerender2();
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(600);
  });

  it("should not have performance issues with multiple hooks and setToggle", () => {
    const { result: result1 } = renderHook(() => useToggle());
    const { result: result2 } = renderHook(() => useToggle());
    const [, , setToggle1] = result1.current;
    const [, , setToggle2] = result2.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        setToggle1(true);
        setToggle2(true);
      });
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(200);
  });

  it("should not have performance issues with multiple hooks and setToggle and toggle", () => {
    const { result: result1 } = renderHook(() => useToggle());
    const { result: result2 } = renderHook(() => useToggle());
    const [, toggle1, setToggle1] = result1.current;
    const [, toggle2, setToggle2] = result2.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        toggle1();
        toggle2();
        setToggle1(true);
        setToggle2(true);
      });
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(400);
  });

  it("should not have performance issues with multiple hooks and setToggle and toggle and rerender", () => {
    const { result: result1, rerender: rerender1 } = renderHook(() =>
      useToggle(),
    );
    const { result: result2, rerender: rerender2 } = renderHook(() =>
      useToggle(),
    );
    const [, toggle1, setToggle1] = result1.current;
    const [, toggle2, setToggle2] = result2.current;

    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      act(() => {
        toggle1();
        toggle2();
        setToggle1(true);
        setToggle2(true);
      });
      rerender1();
      rerender2();
    }

    const end = performance.now();
    const time = end - start;

    expect(time).toBeLessThan(650);
  });
});
