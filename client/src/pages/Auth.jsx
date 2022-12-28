import React, { useEffect } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/Layout";
import classes from "./auth.module.scss";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Layout className={classes.container}>
      <div className={classes.form_container}>
        <Login />
        <Register />
      </div>
    </Layout>
  );
};

export default Auth;
