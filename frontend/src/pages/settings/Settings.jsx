import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

import "./styles.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    
    <div className="settings">
      <div className="settingsContainer">

        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Atualize sua conta</span>
          <span className="settingsTitleDelete">Delete sua conta</span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>
          {/* <label>Avatar</label> */}
          {/* <img className="avatarProfile" */}
            {/* src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic} */}
            {/* alt="" */}
          {/* /> */}
          {/* <input 
            id="fileInput" 
            type="file" 
            className="settingInput" 
            onChange={(e) => setFile(e.target.files[0])}  
          /> */}

          <label>Usuario</label>
          <input 
             type="text"
             placeholder={user.username}
             onChange={(e) => setUsername(e.target.value)}
           />

          <label>Email</label>
          <input     
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <input          
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            className="settingsButton" 
            type="submit">
              Atualizar
          </button>

          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
