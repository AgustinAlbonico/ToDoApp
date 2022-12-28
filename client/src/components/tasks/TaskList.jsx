import axios from "axios";
import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";

import TaskItem from "./TaskItem";
import classes from "./taskList.module.scss";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState("");

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/tareas/misTareas");
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error("La tarea esta vacia");
      return;
    }
    try {
      const { data } = await axios.post("/api/tareas/", {
        text: newTask,
      });
      toast.success("New task added");
      setIsAddingNew(false);
      setNewTask("");
      setTaskList([{ ...data }, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      let confirmacion = window.confirm(`Seguro que desea borrar la tarea?`);
      if (confirmacion) {
        await axios.delete(`/api/tareas/${id}`);
        toast.success("Tarea borrada");
        setTaskList(taskList.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Agregar
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Tarea"
          />
          <button type="submit">Agregar!</button>
        </form>
      )}
      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No se encontro ninguna tarea, cree una!</h1>
      )}
    </div>
  );
}

export default TaskList;
