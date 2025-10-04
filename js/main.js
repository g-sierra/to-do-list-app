import { d, taskInput, addBtn } from "./dom.js";
import { getTaskFromInput, addTask } from "./tasks.js";
import { renderTaskList } from "./render.js";

const handleAdd = () => {
  const newTask = getTaskFromInput(taskInput);
  if (newTask) addTask(newTask);
};

const main = () => {
  addBtn.addEventListener("click", handleAdd);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  renderTaskList();
};

d.addEventListener("DOMContentLoaded", main);
