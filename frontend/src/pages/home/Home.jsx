import { useEffect, useState } from 'react';
import Posts from '../../components/posts/Posts';
import axios from 'axios';
import './styles.css';
import { useLocation } from 'react-router-dom';
// import SideBar from '../../sideBar/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts${search}`)
      setPosts(response.data)
    }
    fetchPosts();
  }, [search])

  return (
    <>
      <div className="home">
        <Posts posts={posts}/>
      </div>
    </>
   
  )
}
