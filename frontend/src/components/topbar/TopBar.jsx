import { Link } from 'react-router-dom';

import { useContext } from "react";
import { Context } from "../../context/Context";

import './styles.css';
import logo from '../../img/logov2.png';

export default function TopBar ()  {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='header'>
      <div className="left">
        <Link to="/">
          <img className='logo' src={logo} alt="logo" />
        </Link>
      </div>

      <div className="center">
        <div className="topList">
          <li className='topListItem'>
            <Link to="/write">
              ESCREVER UM POST
            </Link>
          </li>

          <li className="topListItem" onClick={handleLogout}>
             {user && "SAIR"}
          </li>
        </div>
      </div>

      <div className="right">
        {
          user ?  
          (
        <Link to="/settings">
          <p>{user.username}</p>
            {/* <img 
            className='topImg'
            src={PF+user.profilePic} 
            alt="Profile" 
          /> */}
        </Link>
          ) : (
           <>
            <Link className='loginSpace' to="/login">ENTRAR</Link>
            <Link to="/register">CADASTRAR</Link>
           </>
          )
        }
      </div>
    </div>
  )
}