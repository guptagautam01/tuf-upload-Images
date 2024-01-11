/* eslint-disable no-unused-vars */
// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState();
  const [link, setLink] = useState(null);

  async function handleClick(event){
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("fileName", filename);
    const {data} = await axios.put("http://localhost:5000/api/uploadImage",
      formData,
      {headers: {'Content-type': 'multipart/form-data'}}
    )
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
    <div className="App">
      <div className="uploadImagePanel">
      <h2>Upload Your Images here..</h2>
          <div className="Main" onSubmit={handleClick}>
            <form action='/posts' method='POST' encType='multipart/form-data'>
              <input className="fileUpload" type='file' name='image' accept='image/*'
              onChange={e=>setFile(e.target.files[0])} 
              />
              <label for="filename">File Name: </label>
              <input className="filename" type='text' name='filename' value={filename}
              onChange={e=>setFilename(e.target.value)} 
              />
              <button type='submit'>Submit</button>
            </form>

            <h3>Link:</h3> 
            <a href={`${link}`}>{link}</a>
            <button onClick={
              ()=>{navigator.clipboard.writeText(link);}
              }>Copy</button>
          </div>
      </div>
      
    </div>
  );
}

export default App;
