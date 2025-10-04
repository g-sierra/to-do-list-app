/* Constants / DOM Elements */
const d = document;

const addBtn = d.querySelector("#add-btn");
const taskInput = d.querySelector("#task-input");
const taskContainer = d.querySelector("#task-container");

/* localeStorage data management */
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

/* Initialize State */
const state = {
  tasks: getData() || [],
};

/* State management */
const setState = (updater) => {
  updater();
  storeData();
  renderTaskList();
};

/* Task management */
const getTaskFromInput = (inputElement) => {
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

const addTask = (task) => {
  setState(() => {
    state.tasks.push(task);
  });
};

const removeTask = (id, taskElement) => {
  const newTasks = state.tasks.filter((task) => task.id !== id);
  setState(() => {
    state.tasks = newTasks;
  });
  taskElement.remove();
};

const clearTasks = () => {
  setState(() => {
    state.tasks = [];
  });
};

const toggleTaskDone = (task) => {
  setState(() => {
    task.done = !task.done;
  });
};

const filterTasks = () => {
  setState(() => {
    state.tasks = state.tasks.filter((task) => !task.done);
  });
};

/* Render */
const createElement = (tag, classes = [], text = "", id = "") => {
  const el = d.createElement(tag);
  if (classes.length) el.classList.add(...classes);
  if (text) el.textContent = text;
  if (id) el.id = id;
  return el;
};

const createRemoveBtn = (id, taskElement) => {
  const btn = d.createElement("button");
  btn.className = "btn btn-remove";

  const i = d.createElement("i");
  i.className = "fa-solid fa-trash";

  btn.append(i);

  btn.addEventListener("click", () => removeTask(id, taskElement));

  return btn;
};

const createTaskItem = (task) => {
  const li = createElement("li", ["task-item"]);

  const span = createElement("span", ["task-text"], task.text);
  span.classList.toggle("task-done", task.done);

  /* event listener for toggling done state */
  span.addEventListener("click", () => toggleTaskDone(task));

  /* add remove button to each task */
  const btn = createRemoveBtn(task.id, li);

  li.append(span, btn);

  return li;
};

const createUIBtnGroup = () => {
  const group = createElement("div", ["ui-btn-group"]);

  const clearCompletedBtn = createElement(
    "button",
    ["btn", "btn-clear"],
    "Clear completed tasks",
    "clear-completed-btn",
  );
  clearCompletedBtn.addEventListener("click", filterTasks);

  const clearAllBtn = createElement(
    "button",
    ["btn", "btn-clear"],
    "Clear all tasks",
    "clear-all-btn",
  );
  clearAllBtn.addEventListener("click", () => {
    clearTasks();
    group.remove();
  });

  group.append(clearCompletedBtn);
  group.append(clearAllBtn);

  return group;
};

const renderTaskList = () => {
  const { tasks } = state;

  const fragment = d.createDocumentFragment();
  const taskList = createElement("ul", ["task-list"]);
  fragment.append(taskList);

  if (tasks.length === 0) {
    taskList.append(createElement("p", ["info-message"], "No pending tasks"));
  } else {
    tasks.forEach((task) => {
      taskList.append(createTaskItem(task));
    });
    fragment.append(createUIBtnGroup());
  }

  taskContainer.innerHTML = "";
  taskContainer.append(fragment);
};

const main = () => {
  /* Event Listeners */
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
