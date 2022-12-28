//Importo el modelo para trabajar con las rutas y db
const Tarea = require("../models/Tarea");

//METODOS
////GET ALL
const getAll = async (req, res) => {
  try {
    const tareas = await Tarea.find();

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).send(error);
  }
};

////GET TASKS FROM CURRENT USER
const getAllFromCurrentUser = async (req, res) => {
  try {
    const tareas = await Tarea.find({ user: req.user.id });

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).send(error);
  }
};

////CREATE
const createTarea = async (req, res) => {
  try {
    const tarea = new Tarea({
      text: req.body.text,
      user: req.user.id,
      completed: req.body.completed,
    });

    await tarea.save();

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).send(error);
  }
};

////DELETE
const deleteTarea = async (req, res) => {
  try {
    const result = await Tarea.findById(req.params.id).exec();

    if (!result) {
      return res.status(400).json({ message: "Tarea no encontrada!" });
    }

    if (result.user.toString() !== req.user.id)
      return res.status(401).json("Esta tarea no te pertenece!");

    const task = await Tarea.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: `Se elimino la tarea '${task.text}' con exito!` });
  } catch (error) {
    res.status(500).send(error);
  }
};

////UPDATE
const updateTarea = async (req, res) => {
  try {
    const result = await Tarea.findById(req.params.id).exec();

    if (!result) {
      return res.status(400).json({ message: "Tarea no encontrada!" });
    }

    if (result.user.toString() !== req.user.id)
      return res.status(401).json("Esta tarea no te pertenece!");

    const updatedTask = await Tarea.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, completed: req.body.completed },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
};

//exporto enrutador
module.exports = {
  getAll,
  getAllFromCurrentUser,
  createTarea,
  deleteTarea,
  updateTarea,
};
