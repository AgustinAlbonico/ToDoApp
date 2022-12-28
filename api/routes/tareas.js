//Importo el enrutador
const router = require("express").Router();

const { getAll, createTarea, deleteTarea, updateTarea, getAllFromCurrentUser } = require("../controllers/tareasController");
//Importo el modelo para trabajar con las rutas y db
const Tarea = require("../models/Tarea");

//ENDPOINTS
router.get("/", getAll);
router.get("/misTareas", getAllFromCurrentUser);
router.post("/", createTarea);
router.delete("/:id", deleteTarea);
router.put("/:id", updateTarea);

//exporto enrutador
module.exports = router;
