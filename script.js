/* Constants / DOM Elements */
const d = document;

const addBtn = d.querySelector("#add-btn");
const taskInput = d.querySelector("#task-input");
const taskList = d.querySelector("#task-list");

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

const logData = () => {
  console.log(state.tasks); // for debugging
};

/* Initialize State */
const state = {
  tasks: getData() || [],
};

/* State management */
const setState = (callback) => {
  callback();
  storeData();
  logData();
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

/* Render */
const render = () => {
  const { tasks } = state;

  taskList.innerHTML = "";

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
    span.textContent = task.text;

    const btn = d.createElement("button");
    btn.className = "btn btn-remove";
    btn.textContent = "X";

    btn.addEventListener("click", () => {
      setState(() => state.tasks.splice(idx, 1));
    });

    li.append(span, btn);

    taskList.append(li);
  });

  const clearBtn = d.createElement("button");
  clearBtn.className = "btn btn-clear";
  clearBtn.textContent = "Clear all";

  clearBtn.addEventListener("click", clearTasks);

  taskList.append(clearBtn);
};

/* Event Listeners */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

render();
