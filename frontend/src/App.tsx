import React, { ReactHTMLElement, useEffect, useState } from "react";

/*
  TO DO

  [/] Implement simple fetch / get function and map to screen
  [/] Implement post function
  [/] make put and patch work by clicking the specific functions
  [/] Implement put and place functions
  [/] implement delete
  [] play wiht file handling
  [] use other python modules
*/

const API_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number | null;
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

  const [input, setInput] = useState<any>();

  const [selectedPost, setSelectedPost] = useState<Post | null>();
  const [isPostSelected, setIsPostSelected] = useState<Boolean>(false);
  const [file, setFile] = useState<File>();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput((prevInput: any) => ({
      ...prevInput,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePostSelect = async (item: Post) => {
    if (selectedPost !== item) {
      setSelectedPost(item);
      setIsPostSelected(true);
      return;
    }

    setSelectedPost(null);
    setIsPostSelected(false);
  };

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

  const handlePost = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input.title,
          body: input.body,
        }),
      });

      if (!response.ok) {
        throw new Error("Http error" + response.status);
      }

      fetchData();
      setInput({
        title: undefined,
        body: undefined,
      });
    } catch (error) {
      console.error("Error posting: ", error);
    }
  };

  const handlePatch = async () => {
    const updateData: Partial<Post> = {};
    if (input.title !== undefined) {
      updateData.title = input.title;
    }
    if (input.body !== undefined) {
      updateData.body = input.body;
    }

    try {
      const response = await fetch(`${API_URL}/posts/${selectedPost?.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log(JSON.stringify(updateData));

      console.log(input.title, input.body);

      if (!response.ok) {
        throw new Error("Http error: " + response.status);
      }

      fetchData();
      setSelectedPost(null);
      setIsPostSelected(false);
      setInput({ title: undefined, body: undefined });
    } catch (error) {
      console.error("error updating data: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${selectedPost?.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Http error: " + response.status);
      }
      fetchData();
      setSelectedPost(null);
      setIsPostSelected(false);
    } catch (err) {
      console.error("Error deleting: ", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedPost);
  }, [selectedPost]);

  return (
    <div className="main flex mx-16 ">
      <div className="flex flex-[2] items-center justify-center flex-col space-y-2 h-screen align-middle">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              className="flex text-white font-semibold font-serif flex-col bg-zinc-800 p-11 rounded-2xl"
              key={item.id}
              onClick={() => handlePostSelect(item)}
            >
              <div className="flex">{item.title}</div>
              <div className="flex">{item.body}</div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="flex flex-[8] flex-col h-screen items-center align-middle justify-center w-full">
        <div className="flex flex-col flex-[8]  items-center align-middle justify-center  p-11 rounded-2xl space-y-8 h-full w-full">
          <div className="bg-zinc-800 rounded-xl flex flex-col gap-y-8 size-full items-center align-middle justify-center  p-11">
            <h1 className="text-3xl font-extrabold text-white">File upload</h1>
            <input
              type="file"
              onChange={handleFileChange}
              className="text-xl text-white"
            />
          </div>
          <div className="bg-zinc-800 rounded-xl flex flex-col gap-y-8 size-full items-center align-middle justify-center  p-11">
            <h1 className="text-3xl font-extrabold text-white">
              Add a new Post
            </h1>
            <div className="form flex flex-col space-y-3 w-96">
              <input
                className="border border-white-950 bg-inherit rounded-xl p-2 text-white"
                id="title"
                placeholder="enter ur unique title"
                onChange={handleChange}
              ></input>
              <textarea
                id="body"
                placeholder="enter ur body here"
                className="border border-white-950 bg-inherit rounded-xl p-2 text-white h-64"
                onChange={handleChange}
              ></textarea>
              <button className="bg-white p-2 rounded-xl" onClick={handlePost}>
                submit
              </button>
            </div>
          </div>
          <div>
            {isPostSelected && (
              <div
                key={selectedPost?.id}
                className="bg-zinc-800 rounded-xl w-full flex flex-col size-full items-center align-middle justify-center  p-11"
              >
                <h1 className="text-lg font-extrabold text-white">
                  Editing post: {selectedPost?.id}
                </h1>
                <div className="form flex flex-col space-y-3 w-96">
                  <input
                    className="border border-white-950 bg-inherit rounded-xl p-2 text-white"
                    id="title"
                    defaultValue={selectedPost?.title}
                    placeholder="enter ur unique title"
                    onChange={handleChange}
                  ></input>
                  <textarea
                    id="body"
                    defaultValue={selectedPost?.body}
                    placeholder="enter ur body here"
                    className="border border-white-950 bg-inherit rounded-xl p-2 text-white"
                    onChange={handleChange}
                  ></textarea>
                  <button
                    className="bg-white p-2 rounded-xl"
                    onClick={handlePatch}
                  >
                    PATCH
                  </button>
                  <button
                    className="bg-red-700 p-2 rounded-xl"
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
