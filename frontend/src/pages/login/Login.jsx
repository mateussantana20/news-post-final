import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import "./styles.css";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handlSumibt = async (event) => {
    event.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const response = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };


  return (
    <div className="containerLogin">

    <div className="leftContent">
      <img src="https://images6.alphacoders.com/108/1081204.jpg" alt="Back" />
    </div>

    <div className="rightContent">
        <h1>Faça Login</h1>
          <form onSubmit={handlSumibt}>
            <input 
              placeholder='Digite seu usuario'
              type="text"
              ref={userRef}
            />

            <input 
              placeholder='Digite sua senha'
              type="password"
              ref={passwordRef}
            />      
            <button className="buttonLogin" type="submit" disabled={isFetching}> Acessar</button>
          </form>

          <Link to="/register" className="textLink">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
    </div>
  );
}
