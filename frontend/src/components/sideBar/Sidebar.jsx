import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/categories")
      setCategories(response.data)
    };

    fetchCategories();

  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">SOBRE MIM</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIAS</span>
        <ul className="sidebarList">
          {categories.map(category => (
            <Link to={`/?cat=${category.name}`}>
              <li className="sidebarListItem">
                {category.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
