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

  const fetchData = async () => {
    await fetch(`${API_URL}/posts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Http error" + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col space-y-2 h-screen align-middle">
      {data.length > 0 ? (
        data.map((item) => (
          <div className="flex text-white font-semibold font-serif flex-col bg-zinc-800 p-11 rounded-2xl">
            <div className="flex" key={item.id}>
              {item.title}
            </div>
            <div className="flex" key={item.id}>
              {item.body}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
