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
  });
};

export const removeTask = (id) => {
  const newTasks = state.tasks.filter((task) => task.id !== id);
  setState(() => {
    state.tasks = newTasks;
  });
};

export const clearTasks = () => {
  setState(() => {
    state.tasks = [];
  });
};

export const filterTasks = () => {
  setState(() => {
    state.tasks = state.tasks.filter((task) => !task.done);
  });
};

export const toggleTaskDone = (task) => {
  setState(() => {
    task.done = !task.done;
  });
};
