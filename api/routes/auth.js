//Importo el enrutador
const Router = require("express").Router();
//Importo metodos del controller
const {register, login, logout, isLoggedIn} = require("../controllers/authController.js");

Router.post("/register", register)
Router.post("/login", login)
Router.get("/logout", logout)
Router.get("/is_logged_in", isLoggedIn)

//exporto enrutador
module.exports = Router;
