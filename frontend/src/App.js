import { useContext } from "react";
import { Context } from "./context/Context";

import TopBar  from "./components/topbar/TopBar";
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import NewPost from './pages/newpostcreate/NewPost';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


import './global.css';

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" exatc element={<Home />} />
        <Route path="/register" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/write" element={user ? <NewPost/> : <Register />} />
        <Route path="/settings" element={user ? <Settings/> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
