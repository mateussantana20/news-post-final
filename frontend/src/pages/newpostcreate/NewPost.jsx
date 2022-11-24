import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import './styles.css';

export default function NewPost() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const response = await axios.post("/posts", newPost);
      window.location.replace("/post/" + response.data._id);
    } catch (err) {}
  }
  
  return (
    <div className="newPost">
      
      <div className='writeImgContainer'>
        {file && (
          <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className='formCreatePost'>
          {/* <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label> */}
        <input 
          className='selectInputFile' 
          type="file" id="fileInput" 
          onChange={(event) => setFile(event.target.files[0])}
        />

        <input 
          type="text" 
          placeholder="Título" 
          className='writeInput' 
          autoFocus 
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea 
          placeholder='Digite aqui' 
          type="text" 
          className='writeInput writeText'
          onChange={(event) => setDesc(event.target.value)}
        ></textarea>
          <button type="submit" className='postSubmit'>Publicar</button>
        </form>
    </div>
  );
}

