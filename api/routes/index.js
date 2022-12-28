const tareasRouter = require("./tareas");
const authRouter = require("./auth");
const userRouter = require("./users")
const Router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

//Rutas
Router.use("/auth", authRouter);
Router.use("/tareas", checkAuth, tareasRouter);
Router.use("/users", checkAuth, userRouter);

module.exports = Router