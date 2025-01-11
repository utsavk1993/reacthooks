"use strict";
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    useCounter: function() {
        return useCounter_default;
    },
    useLocalStorage: function() {
        return useLocalStorage_default;
    },
    usePrevious: function() {
        return usePrevious_default;
    },
    useSessionStorage: function() {
        return useSessionStorage_default;
    },
    useToggle: function() {
        return useToggle_default;
    }
});
module.exports = __toCommonJS(src_exports);
// src/hooks/useToggle.ts
var import_react = require("react");
function useToggle() {
    var initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _ref = _sliced_to_array((0, import_react.useState)(initialValue), 2), value = _ref[0], setValue = _ref[1];
    var toggle = (0, import_react.useCallback)(function() {
        return setValue(function(prev) {
            return !prev;
        });
    }, []);
    var setToggle = (0, import_react.useCallback)(function(value2) {
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
var import_react2 = require("react");
function usePrevious(value) {
    var ref = (0, import_react2.useRef)();
    (0, import_react2.useEffect)(function() {
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
}
var usePrevious_default = usePrevious;
// src/hooks/useCounter.ts
var import_react3 = require("react");
function useCounter() {
    var initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, step = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var _ref = _sliced_to_array((0, import_react3.useState)(initialValue), 2), count = _ref[0], setCount = _ref[1];
    var increment = (0, import_react3.useCallback)(function() {
        return setCount(function(prev) {
            return prev + step;
        });
    }, [
        step
    ]);
    var decrement = (0, import_react3.useCallback)(function() {
        return setCount(function(prev) {
            return prev - step;
        });
    }, [
        step
    ]);
    var reset = (0, import_react3.useCallback)(function() {
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
var import_react4 = require("react");
function useLocalStorage(key, initialValue) {
    var _ref = _sliced_to_array((0, import_react4.useState)(function() {
        try {
            var item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return initialValue;
        }
    }), 2), value = _ref[0], setStoredValue = _ref[1];
    var setValue = (0, import_react4.useCallback)(function(value2) {
        try {
            localStorage.setItem(key, JSON.stringify(value2));
            setStoredValue(value2);
        } catch (error) {
            console.error("Error setting localStorage value", error);
        }
    }, [
        key
    ]);
    var resetValue = (0, import_react4.useCallback)(function() {
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
var import_react5 = require("react");
function useSessionStorage(key, initialValue) {
    var _ref = _sliced_to_array((0, import_react5.useState)(function() {
        try {
            var item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading from sessionStorage", error);
            return initialValue;
        }
    }), 2), value = _ref[0], setStoredValue = _ref[1];
    var setValue = (0, import_react5.useCallback)(function(value2) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value2));
            setStoredValue(value2);
        } catch (error) {
            console.error("Error setting sessionStorage value", error);
        }
    }, [
        key
    ]);
    var resetValue = (0, import_react5.useCallback)(function() {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    useCounter: useCounter,
    useLocalStorage: useLocalStorage,
    usePrevious: usePrevious,
    useSessionStorage: useSessionStorage,
    useToggle: useToggle
});
