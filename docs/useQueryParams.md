# `useQueryParams`

A hook to manage and manipulate URL query parameters.

### Usage

#### Import the Hook

`import { useQueryParams } from "reacthooks";`

#### Basic Example

```
import { useNavigate } from 'react-router-dom';
import { useQueryParams } from 'reacthooks';

function App() {
  const location = { search: "?search=react" };
  const navigate = useNavigate();

  const setLocation = (newPath) => navigate(newPath);

  const { queryParams, setQueryParams } = useQueryParams(location, setLocation);

  // Get query parameter
  console.log(queryParams.get("search")); // "react"

  // Set query parameter
  const updateSearch = () => setQueryParams({ search: "hooks" });

  return (
    <div>
      <h1>Current Search Query: {queryParams.get("search")}</h1>
      <button onClick={updateSearch}>Update Query to "hooks"</button>
    </div>
  );
}
```

### API

#### Parameters

1. `location`
  - Type: `{ search: string }`
  - Description: The current location object containing the query string of the URL
  - Example: `{ search: "?search=react&filter=popular" }`
2. `setLocation`
  - Type: `(path: string) => void`
  - Description: A function to update the URL with the provided query string. The string must include the leading `?`
  - Example: `(newPath) => { console.log(newPath); }`

#### Returns
An object containing the following properties:

1. `queryParams`
  - Type: `URLSearchParams`
  - Description: An instance of `URLSearchParams` representing the current query parameters. You can use its methods (e.g., get, set, delete) to interact with the parameters.
2. `setQueryParams`
  - Type: `(params: Record<string, string | undefined>) => void`
  - Description: A function to update the query parameters. Accepts an object where keys are parameter names and values are their desired values. Passing undefined removes a parameter.

Made with ❤️ for React developers.