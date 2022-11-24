import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./styles.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fethPost = async () => {
      const response = await axios.get(`/posts/${path}`);
      setPost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
    }
    fethPost();
  }, [path])


  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };
  
  return (
    <div className="singlePost">
      <div className="singlePostContainer">

        { updateMode ? 
          <input  type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)} 
          /> : (
          <div className="singlePostTitle">
          <h1>{title}</h1>
          {post.username === user?.username && (
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"  
                onClick={() => setUpdateMode(true)}
              ></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          )}
        </div>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
              <Link className="link" to={`/?user=${post.username}`}>
                <b className="singlePostAuthor">
                  {post.username}
                </b>
              </Link>
          </span>
          <span className="data-time">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {post.photo && (
          <img
            className="singlePostImg"
            src={publicFolder + post.photo}
            alt=""
          /> 
        )}

        {updateMode ? (
           <textarea 
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} 
          />
          ) : (
            <p className="singlePostDesc">
            {desc}
          </p>
          )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            ATUALIZAR
          </button>
        )}
      </div>
    </div>
  );
}
