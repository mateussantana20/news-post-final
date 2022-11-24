import "./styles.css";
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      const response = await axios.post("/auth/register", {
        username,
        email,
        password
      });
      response.data && window.location.replace("/login");
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className="containerRegister">

    <div className="leftContent">
      <img src="https://images6.alphacoders.com/108/1081204.jpg" alt="Back" />
    </div>

    <div className="rightContent">
        <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>

          <input 
              placeholder='Digite seu usuario'
              type="text"
              onChange={event => setUsername(event.target.value)}
            />

            <input 
              placeholder='Digite seu email'
              type="text"
              onChange={event => setEmail(event.target.value)}
            />

            <input 
              placeholder='Digite sua senha'
              type="password"
              onChange={event => setPassword(event.target.value)}
            />      
            <button className="buttonSubmit" type="submit"> CADASTRAR</button>
            {error && <span className="error">Deu algo errado!!</span>}
          </form>


          <Link to="/login" className="textLink">
            Já possui uma conta? Entre
          </Link>
        </div>
    </div>
  );
}
