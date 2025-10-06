import { d, taskInput, addBtn } from "./dom.js";
import { getTaskFromInput, addTask } from "./tasks.js";
import { renderState } from "./render.js";

const handleAdd = () => {
  const newTask = getTaskFromInput(taskInput);
  if (newTask) addTask(newTask);
};

const setEventListeners = () => {
  addBtn.addEventListener("click", handleAdd);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) button.blur();
  });
};

const main = () => {
  setEventListeners();
  renderState();
};

d.addEventListener("DOMContentLoaded", main);
