/* Constants / DOM Elements */
const d = document;

const addBtn = d.querySelector("#add-btn");
const taskInput = d.querySelector("#task-input");
const taskList = d.querySelector("#task-list");

/* Initialize State */
const state = {
  tasks: getData() || [],
};

/* localeStorage helpers */
function storeData() {
  if (state.tasks.length === 0) {
    localStorage.removeItem("tasks");
    return;
  }
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function getData() {
  return JSON.parse(localStorage.getItem("tasks"));
}

/* State management */
function setState(callback) {
  callback();
  storeData();
  render();
}

/* Task management */
function addTask() {
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
}

function clearTasks() {
  setState(() => {
    state.tasks = [];
  });
}

function logTasks() {
  console.log(state.tasks);
}

/* Render */
function render() {
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
  logTasks();
}

/* Event Listeners */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

render();
