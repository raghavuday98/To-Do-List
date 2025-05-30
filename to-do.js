const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".addBtn");
const taskList = document.querySelector(".task-list");
const activeTaskList = document.querySelector(".activeTaskList");
const completedTaskList = document.querySelector(".completedTaskList");

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = taskInput.value.trim();
  if (input === "") return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: input, completed: false });
  saveTasksToStorage(tasks);

  taskInput.value = "";
  renderLists();
}

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

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasksToStorage(tasks);
      renderLists();
    });

    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      activeTaskList.appendChild(li);
    }

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

addBtn.addEventListener("click", addTask);
window.onload = () => {
  renderLists();
  allTask(); 
};
