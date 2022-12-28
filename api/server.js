//importando dependencias
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
//const {  authRouter, tareasRouter, userRouter } = require("./routes/index");
const routes = require("./routes/index")

const app = express();

////Variables de entorno
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 8000;

//middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// error handler
// eslint-disable-next-line
/*app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message, stack: err.stack });
});*/

//Rutas
app.use("/api", routes);

//conexion con la base de datos
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos!"))
  .catch(() => console.log("Error al conectarse a la base de datos!"));

//inicializacion del server
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});
