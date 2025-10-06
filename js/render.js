import { d, taskContainer } from "./dom.js";
import { state } from "./state.js";
import * as tasks from "./tasks.js";
import { subscribe } from "./pubsub.js";

const createElement = (tag, classes = [], text = "", id = "") => {
  const el = d.createElement(tag);
  if (classes.length) el.classList.add(...classes);
  if (text) el.textContent = text;
  if (id) el.id = id;
  return el;
};

const createRemoveBtn = (taskId) => {
  const btn = d.createElement("button");
  btn.className = "btn btn-remove";

  const i = d.createElement("i");
  i.className = "fa-solid fa-trash";

  btn.append(i);

  btn.addEventListener("click", () => tasks.removeTask(taskId));

  return btn;
};

const createTaskItem = (task) => {
  const li = createElement("li", ["task-item"]);
  li.dataset.id = task.id;

  const span = createElement("span", ["task-text"], task.text);
  span.classList.toggle("task-done", task.done);

  span.addEventListener("click", () => tasks.toggleTaskDone(task));

  const btn = createRemoveBtn(task.id, li);

  li.append(span, btn);

  return li;
};

const createUIBtnGroup = () => {
  const group = createElement("div", ["ui-btn-group"]);

  const clearCompletedBtn = createElement(
    "button",
    ["btn", "btn-secondary"],
    "Clear completed tasks",
    "clear-completed-btn",
  );
  clearCompletedBtn.addEventListener("click", tasks.filterTasks);

  const clearAllBtn = createElement(
    "button",
    ["btn", "btn-clear-all"],
    "Clear all tasks",
    "clear-all-btn",
  );
  clearAllBtn.addEventListener("click", tasks.clearTasks);

  group.append(clearCompletedBtn, clearAllBtn);

  return group;
};

export const renderState = () => {
  const { tasks } = state;

  const fragment = d.createDocumentFragment();
  const taskList = createElement("ul", ["task-list"]);
  fragment.append(taskList);

  if (tasks.length === 0) {
    taskList.append(createElement("li", ["info-message"], "No pending tasks"));
  } else {
    tasks.forEach((task) => {
      taskList.append(createTaskItem(task));
    });
    fragment.append(createUIBtnGroup());
  }

  taskContainer.innerHTML = "";
  taskContainer.append(fragment);
};

/* event handlers */
const addTaskItem = (task) => {
  const { tasks } = state;

  if (tasks.length === 1) {
    renderState();
    return;
  }

  const list = taskContainer.querySelector(".task-list");
  if (list) list.append(createTaskItem(task));
};

const removeTaskItem = (taskId) => {
  const { tasks } = state;

  const el = taskContainer.querySelector(`[data-id="${taskId}"]`);
  if (el) el.remove();

  if (tasks.length === 0) {
    renderState();
  }
};

const toggleTaskDoneClass = (task) => {
  const el = taskContainer.querySelector(`[data-id="${task.id}"] .task-text`);
  if (el) el.classList.toggle("task-done", task.done);
};

subscribe("task:added", addTaskItem);
subscribe("task:removed", removeTaskItem);
subscribe("task:toggled", toggleTaskDoneClass);
subscribe("tasks:cleared", renderState);
subscribe("tasks:filtered", renderState);
