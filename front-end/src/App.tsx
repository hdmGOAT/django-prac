import { useEffect, useState } from "react";

/*
  TO DO

  - Implement simple fetch / get function and map to screen
  - Implement post function
  - Implement put and place functions
  - implement delete
  - play wiht file handling
  - use other python modules
*/

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState([
    {
      id: 0,
      title: "",
      body: "",
    },
  ]);

  useEffect(() => {
    fetch(`${API_URL}/posts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Http error" + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  });

  return (
    <div>
      {data &&
        data.map((item, index: number) => (
          <div key={item.id}>{item.title}</div>
        ))}
    </div>
  );
}

export default App;
