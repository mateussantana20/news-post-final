import Post from "../post/Post";
import "./styles.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map(post => (
        <Post post={post}/>
      ))}
    </div>
  );
}
