# 🚀 `useLocalStorage` Hook

A powerful, easy-to-use React hook for managing local storage with getter, setter, and reset functionality. Perfect for persisting state in your React apps! 🎉

### 🔧 Usage

#### Import the Hook

`import { useLocalStorage } from "reacthooks";`

#### Basic Example

```
function App() {
  const [theme, setTheme, resetTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      <button onClick={resetTheme}>Reset Theme</button>
    </div>
  );
}
```

### 📜 API

Returns a tuple containing:

1. `value (T)`: The current value in localStorage or the initial value.
2. `setValue (function)`: A function to update the value in localStorage.
3. `resetValue (function)`: A function to reset the value to the initialValue.

Made with ❤️ for React developers.
