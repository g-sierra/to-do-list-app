const d = document;

/* DOM Elements */
const addBtn = d.querySelector("#add-btn");
const taskInput = d.querySelector("#task-input");
const taskList = d.querySelector("#task-list");

/* State management functions */
const setState = (callback) => {
  callback();
  render();
};

const storeTasks = () => {
  if (state.tasks.length === 0) return;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
};

const getTasks = () => {
  return JSON.parse(localStorage.getItem("tasks"));
};

const clearTasks = () => {
  localStorage.removeItem("tasks");
};

const logTasks = () => console.log(state.tasks);

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

  storeTasks();
  logTasks();
  
  taskInput.value = "";
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

  tasks.forEach((task) => {
    const li = d.createElement("li");
    li.className = "task-item";

    const span = d.createElement("span");
    span.textContent = task.text;

    const btn = d.createElement("button");
    btn.className = "btn btn-remove";
    btn.textContent = "X";

    li.append(span, btn);

    taskList.append(li);
  });

  const clearBtn = d.createElement("button");
  clearBtn.className = "btn btn-clear";
  clearBtn.textContent = "Clear all";

  clearBtn.addEventListener("click", () => {
    clearTasks();

    setState(() => {
      state.tasks = [];
    });

    storeTasks();
  });

  taskList.append(clearBtn);
};

/* Initialize State */
const state = {
  tasks: getTasks() || [],
};

storeTasks();
logTasks();

/* Event Listeners */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

render();
