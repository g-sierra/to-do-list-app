import { d, taskInput, addBtn } from "./dom.js";
import { getTaskFromInput, addTask } from "./tasks.js";
import renderTaskList from "./render.js";

const main = () => {
  addBtn.addEventListener("click", () => {
    addTask(getTaskFromInput(taskInput));
  });
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask(getTaskFromInput(taskInput));
    }
  });

  renderTaskList();
};

d.addEventListener("DOMContentLoaded", main);
