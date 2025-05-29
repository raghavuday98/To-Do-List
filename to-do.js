const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".addBtn");
const taskList = document.querySelector(".task-list");
const activeTaskList = document.querySelector(".activeTaskList");
const completedTaskList = document.querySelector(".completedTaskList");

// 💾 LocalStorage functions
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ➕ Add new task
function addTask() {
  const input = taskInput.value.trim();
  if (input === "") return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: input, completed: false });
  saveTasksToStorage(tasks);

  taskInput.value = "";
  renderLists();
}

// 🔁 Render all 3 lists
function renderLists() {
  taskList.innerHTML = "";
  activeTaskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  const tasks = getTasksFromStorage();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    li.appendChild(span);
    li.appendChild(checkbox);

    // ✅ Checkbox event
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasksToStorage(tasks);
      renderLists();
    });

    // 📦 Append to correct list
    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      activeTaskList.appendChild(li);
    }

    // 👥 Add to All tab (cloned)
    const clone = li.cloneNode(true);
    const clonedCheckbox = clone.querySelector("input");
    clonedCheckbox.addEventListener("change", () => {
      tasks[index].completed = clonedCheckbox.checked;
      saveTasksToStorage(tasks);
      renderLists();
    });
    taskList.appendChild(clone);
  });
}

// 📋 Tabs
function allTask() {
  taskList.style.display = "block";
  activeTaskList.style.display = "none";
  completedTaskList.style.display = "none";
  let AllTaskBtn = document.getElementsByClassName("allTask");
}
function activeTask() {
  taskList.style.display = "none";
  activeTaskList.style.display = "block";
  completedTaskList.style.display = "none";
}
function completedTask() {
  taskList.style.display = "none";
  activeTaskList.style.display = "none";
  completedTaskList.style.display = "block";
}

// 🚀 On load
addBtn.addEventListener("click", addTask);
window.onload = () => {
  renderLists();
  allTask(); // Default tab = All
};
