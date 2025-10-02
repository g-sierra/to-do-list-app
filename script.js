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
const setState = (callback) => {
  callback();
  storeData();
  render();
};

/* Task management */
const addTask = () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const now = new Date();

  const task = {
    text: text,
    date: now.toISOString(),
    done: false,
  };

  setState(() => {
    state.tasks.push(task);
  });

  taskInput.value = "";
};

const clearTasks = () => {
  setState(() => {
    state.tasks = [];
  });
};

const filterTasks = () => {
  setState(() => {
    state.tasks = state.tasks.filter((task) => !task.done);
  });
};

/* Render */
const render = () => {
  const { tasks } = state;

  taskContainer.innerHTML = "";

  const taskList = d.createElement("ul");
  taskList.className = "task-list";

  taskContainer.append(taskList);

  if (tasks.length === 0) {
    const p = d.createElement("p");
    p.className = "info-message";
    p.textContent = "No pending tasks";

    taskList.append(p);
    return;
  }

  tasks.forEach((task, idx) => {
    const li = d.createElement("li");
    li.className = "task-item";

    const span = d.createElement("span");
    span.className = "task-text";
    if (state.tasks[idx].done) {
      span.classList.add("task-done");
    } else {
      span.classList.remove("task-done");
    }
    span.textContent = task.text;

    /* event listener for toggling done state */
    span.addEventListener("click", () => {
      setState(() => {
        state.tasks[idx].done = !state.tasks[idx].done;
      });
    });

    /* add remove button to each task */
    const btn = d.createElement("button");
    btn.className = "btn btn-remove";

    const i = d.createElement("i");
    i.className = "fa-solid fa-trash";

    btn.append(i);

    btn.addEventListener("click", () => {
      setState(() => state.tasks.splice(idx, 1));
    });

    li.append(span, btn);

    taskList.append(li);
  });

  /* UI Buttons */
  const uiBtnGroup = d.createElement("div");
  uiBtnGroup.className = "ui-btn-group";

  taskContainer.append(uiBtnGroup);

  const clearCompletedBtn = d.createElement("button");
  clearCompletedBtn.className = "btn btn-clear";
  clearCompletedBtn.id = "clear-completed-btn";
  clearCompletedBtn.textContent = "Clear completed tasks";

  clearCompletedBtn.addEventListener("click", filterTasks);

  const clearAllBtn = d.createElement("button");
  clearAllBtn.className = "btn btn-clear";
  clearAllBtn.id = "clear-all-btn";
  clearAllBtn.textContent = "Clear all tasks";

  clearAllBtn.addEventListener("click", () => {
    clearTasks();
    uiBtnGroup.remove();
  });

  uiBtnGroup.append(clearCompletedBtn);
  uiBtnGroup.append(clearAllBtn);
};

/* Event Listeners */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

render();
