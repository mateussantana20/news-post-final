// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Post({ post }) {
  const publicFolder = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img 
          className="postImg" 
          src={publicFolder + post.photo} 
          alt="" 
        />
      )}
      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map(category => (
            <span className="postCategory">
              {category.name}
          </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`}>
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          { new Date(post.createdAt).toDateString() }
        </span>
      </div>
      <div className="postDesc">
        {/* <p>{post.desc}</p> */}
      </div>
    </div>
  );
}
