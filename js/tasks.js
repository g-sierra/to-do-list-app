import { state, setState } from "./state.js";

export const getTaskFromInput = (inputElement) => {
  const text = inputElement.value.trim();
  if (!text) return;

  const task = {
    id: Date.now(),
    text: text,
    done: false,
  };

  inputElement.value = "";

  return task;
};

export const addTask = (task) => {
  setState(() => {
    state.tasks.push(task);
  }, "task:added", task);
};

export const removeTask = (taskId) => {
  setState(() => {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  }, "task:removed", taskId);
};

export const clearTasks = () => {
  setState(() => {
    state.tasks = [];
  }, "tasks:cleared");
};

export const filterTasks = () => {
  setState(() => {
    state.tasks = state.tasks.filter((task) => !task.done);
  }, "tasks:filtered");
};

export const toggleTaskDone = (task) => {
  setState(() => {
    task.done = !task.done;
  }, "task:toggled", task);
};
