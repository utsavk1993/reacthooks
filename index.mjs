// src/hooks/useToggle.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { useState, useCallback } from "react";
function useToggle() {
    var initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _useState = _sliced_to_array(useState(initialValue), 2), value = _useState[0], setValue = _useState[1];
    var toggle = useCallback(function() {
        return setValue(function(prev) {
            return !prev;
        });
    }, []);
    var setToggle = useCallback(function(value2) {
        return setValue(value2);
    }, []);
    return [
        value,
        toggle,
        setToggle
    ];
}
var useToggle_default = useToggle;
// src/hooks/usePrevious.ts
import { useRef, useEffect } from "react";
function usePrevious(value) {
    var ref = useRef();
    useEffect(function() {
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
}
var usePrevious_default = usePrevious;
// src/hooks/useCounter.ts
import { useState as useState2, useCallback as useCallback2 } from "react";
function useCounter() {
    var initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, step = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var _useState2 = _sliced_to_array(useState2(initialValue), 2), count = _useState2[0], setCount = _useState2[1];
    var increment = useCallback2(function() {
        return setCount(function(prev) {
            return prev + step;
        });
    }, [
        step
    ]);
    var decrement = useCallback2(function() {
        return setCount(function(prev) {
            return prev - step;
        });
    }, [
        step
    ]);
    var reset = useCallback2(function() {
        return setCount(initialValue);
    }, [
        initialValue
    ]);
    return [
        count,
        increment,
        decrement,
        reset
    ];
}
var useCounter_default = useCounter;
// src/hooks/useLocalStorage.ts
import { useState as useState3, useCallback as useCallback3 } from "react";
function useLocalStorage(key, initialValue) {
    var _useState3 = _sliced_to_array(useState3(function() {
        try {
            var item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return initialValue;
        }
    }), 2), value = _useState3[0], setStoredValue = _useState3[1];
    var setValue = useCallback3(function(value2) {
        try {
            localStorage.setItem(key, JSON.stringify(value2));
            setStoredValue(value2);
        } catch (error) {
            console.error("Error setting localStorage value", error);
        }
    }, [
        key
    ]);
    var resetValue = useCallback3(function() {
        try {
            localStorage.setItem(key, JSON.stringify(initialValue));
            setStoredValue(initialValue);
        } catch (error) {
            console.error("Error resetting localStorage value", error);
        }
    }, [
        key,
        initialValue
    ]);
    return [
        value,
        setValue,
        resetValue
    ];
}
var useLocalStorage_default = useLocalStorage;
// src/hooks/useSessionStorage.ts
import { useState as useState4, useCallback as useCallback4 } from "react";
function useSessionStorage(key, initialValue) {
    var _useState4 = _sliced_to_array(useState4(function() {
        try {
            var item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from sessionStorage", error);
            return initialValue;
        }
    }), 2), value = _useState4[0], setStoredValue = _useState4[1];
    var setValue = useCallback4(function(value2) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value2));
            setStoredValue(value2);
        } catch (error) {
            console.error("Error setting sessionStorage value", error);
        }
    }, [
        key
    ]);
    var resetValue = useCallback4(function() {
        try {
            sessionStorage.setItem(key, JSON.stringify(initialValue));
            setStoredValue(initialValue);
        } catch (error) {
            console.error("Error resetting sessionStorage value", error);
        }
    }, [
        key,
        initialValue
    ]);
    return [
        value,
        setValue,
        resetValue
    ];
}
var useSessionStorage_default = useSessionStorage;
export { useCounter_default as useCounter, useLocalStorage_default as useLocalStorage, usePrevious_default as usePrevious, useSessionStorage_default as useSessionStorage, useToggle_default as useToggle };
