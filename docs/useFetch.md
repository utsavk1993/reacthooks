# `useFetch`

A hook for fetching data from APIs, complete with loading and error handling.

### Usage

#### Import the Hook

`import { useFetch } from "reacthooks";`

#### Basic Example

```
function App() {
  const { data, isLoading, error } = useFetch("https://api.example.com/data");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### API

#### Parameters

1. `url`
  - Type: `string`
  - Description: The URL to fetch data from
  - Example: `https://api.example.com/data`
2. `options` (optional)
  - Type: `RequestInit`
  - Description: Optional configuration object for the fetch function
  - Example: `{ method: "GET", headers: { "Authorization": "Bearer token" } }`

#### Returns
An object containing the following properties:

1. `data`
  - Type: `T | null`
  - Description: The data fetched from the API. Initially null until data is fetched
2. `isLoading`
  - Type: `boolean`
  - Description: A boolean indicating whether the data is being fetched. Starts as true and switches to false after the operation completes
3. `error`
  - Type: `string | null`
  - Description: An error message if the fetch operation fails, or `null` if no error occurred

Made with ❤️ for React developers.
