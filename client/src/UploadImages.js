import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const UploadImages = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState();
  const [link, setLink] = useState(null);

  async function handleClick(event) {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("fileName", filename);
    const { data } = await axios.put(
      "http://localhost:5000/api/uploadImage",
      formData,
      { headers: { "Content-type": "multipart/form-data" } }
    );
    console.log(data);
    setLink(data.link);
    // fetch("http://localhost:5000/api/auth/login",{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //    "email": "test1@gmail.com",
    //    "password": "test1_password"
    //   })
    //  })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log(json);
    //         });
  }

  return (
    <div>
      <div className="uploadImagePanel mx-auto p-6 bg-gray-100 shadow-md rounded-md min-h-screen">
        {/* <h2>Upload Your Images here..</h2> */}
        <div className="Main" onSubmit={handleClick}>
          <form action="/posts" method="POST" encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Your Images here
              </label>
              <input
                className="fileUpload border-2 border-gray-300 rounded-md p-2 w-full"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label
                for="filename"
                className="block text-gray-700 font-bold mb-2"
              >
                File Name:{" "}
              </label>
              <input
                className="filename border-2 border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
          <div className="mb-4 mt-10 flex flex-row">
            <div>
              <h3 className="block text-gray-700 font-bold mb-2">
                Link:{" "}
                <a className="text-black font-normal" href={`${link}`}>
                  {link}
                </a>
              </h3>
            </div>
            <div className="pl-5">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(link);
                }}
                className="outline outline-1 block text-gray-700 font-bold mb-2 px-2 pb-1 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
