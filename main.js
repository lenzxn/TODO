const tasks = [];

let lastJustCompletedIndex = null;
const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const p = document.querySelector("p");
const errorEl = document.getElementById("taskError");

window.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  if (card) requestAnimationFrame(() => card.classList.add("is-in"));
});

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.add("shake");
  input.setAttribute("aria-invalid", "true");
  setTimeout(() => errorEl.classList.remove("shake"), 300);
}

function clearError() {
  if (!errorEl.textContent) return;
  errorEl.textContent = "";
  input.setAttribute("aria-invalid", "false");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();
  if (value === "") {
    showError("Input must not be empty!");
    return;
  }

  clearError();

  const newTask = { text: value, done: false };
  tasks.push(newTask);
  input.value = "";

  addTaskToList(newTask, tasks.length - 1);
});

input.addEventListener("input", () => {
  if (input.value.trim() !== "") clearError();
});

function addTaskToList(task, i) {
  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;
  textSpan.classList.add("task-text");
  li.appendChild(textSpan);

  const trashCan = document.createElement("span");
  trashCan.innerHTML = "&#128465;";
  trashCan.classList.add("trashcan");

  trashCan.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks.splice(i, 1);
    display();
  });

  if (task.done) li.classList.add("completed");

  li.appendChild(trashCan);

  li.addEventListener("click", () => {
    const becomingDone = !task.done;
    task.done = !task.done;
    lastJustCompletedIndex = becomingDone ? i : null;
    display();
  });

  li.classList.add("fade-in");

  taskList.appendChild(li);
  if (i === lastJustCompletedIndex) {
    const textEl = li.querySelector(".task-text");
    if (textEl) {
      textEl.addEventListener(
        "animationend",
        () => {
          li.classList.remove("just-completed");
          lastJustCompletedIndex = null;
        },
        { once: true }
      );
    }
  }

  const doneCount = tasks.filter((t) => t.done).length;
  p.textContent = doneCount + " " + "completed";
}

function display() {
  taskList.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.classList.add("task-text");
    li.appendChild(textSpan);

    const trashCan = document.createElement("span");
    trashCan.innerHTML = "&#128465;";
    trashCan.classList.add("trashcan");

    trashCan.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      display();
    });

    if (task.done) li.classList.add("completed");
    if (i === lastJustCompletedIndex) li.classList.add("just-completed");

    li.appendChild(trashCan);

    li.addEventListener("click", () => {
      const becomingDone = !task.done;
      task.done = !task.done;
      lastJustCompletedIndex = becomingDone ? i : null;
      display();
    });

    taskList.appendChild(li);
    if (i === lastJustCompletedIndex) {
      const textEl = li.querySelector(".task-text");
      if (textEl) {
        textEl.addEventListener(
          "animationend",
          () => {
            li.classList.remove("just-completed");
            lastJustCompletedIndex = null;
          },
          { once: true }
        );
      }
    }
  });

  const doneCount = tasks.filter((t) => t.done).length;
  p.textContent = doneCount + " " + "completed";
}
