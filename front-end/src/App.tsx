import { useEffect, useState } from "react";

/*
  TO DO

  [/] Implement simple fetch / get function and map to screen
  [] Implement post function
  [] Implement put and place functions
  [] implement delete
  [] play wiht file handling
  [] use other python modules
*/

const API_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [data, setData] = useState<Post[]>([
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
    <div className="main flex mx-16">
      <div className="flex flex-[2] items-center justify-center flex-col space-y-2 h-screen align-middle">
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
      <div className="flex flex-[8] h-screen items-center align-middle justify-center">
        <div className="flex flex-col flex-[8]  items-center align-middle justify-center bg-zinc-800 p-11 rounded-2xl space-y-8">
          <h1 className="text-3xl font-extrabold text-white">Add a new Post</h1>
          <div className="form flex flex-col space-y-3">
            <input className="border border-white-950 bg-inherit rounded-xl p-2 text-white"></input>
            <textarea className="border border-white-950 bg-inherit rounded-xl p-2 text-white"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
