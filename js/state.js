import { renderTaskList } from "./render.js";

const getData = () => {
  return JSON.parse(localStorage.getItem("tasks"));
};

const storeData = () => {
  if (state.tasks.length === 0) {
    localStorage.removeItem("tasks");
    return;
  }
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
};

export const state = {
  tasks: getData() || [],
};

export const setState = (updater) => {
  updater();
  storeData();
  renderTaskList();
};
