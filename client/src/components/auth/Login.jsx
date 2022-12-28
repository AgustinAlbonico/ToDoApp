import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import classes from "./auth.module.scss";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post("/api/auth/login", { email, password });
      navigate("/");
      toast.success("Login completo!");
    } catch (error) {
      console.log(error);
      toast.error("Fallo el registro");
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="Email" required />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
