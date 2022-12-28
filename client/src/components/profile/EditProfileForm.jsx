import React, { useEffect } from "react";
import classes from "./editProfileForm.module.scss";
import { Link, Navigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/user");
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preverDefault();
    try {
      const res = await axios.put("/api/users/user", user)
      toast.success("Actualizacion completada!")
      setUser(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar usuario")
    }
  };

  return (
    <div>
      <Link to="/" className={classes.backBtn}>
        <BsArrowLeftShort />
        Home
      </Link>
      <div>
        <h1>Editar Perfil</h1>
        <form className={classes.editForm} onSubmit={handleSubmit}>
          <label htmlFor="name">
            Nombre completo
            <input
              type="text"
              name="name"
              placeholder="Nombre Completo"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
