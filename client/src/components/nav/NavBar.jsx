import React from "react";
import { useState, useEffect } from "react";
import classes from "./navBar.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const userInfo = async () => {
    try {
      const { data } = await axios.get("/api/users/user");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      navigate("/auth");
      toast.success("Cerro sesion correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al cerrar sesion");
    }
  };

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <h1 className={classes.email}>{user.email}</h1>
          <Link to="/edit-profile" className={classes.editBtn}>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
