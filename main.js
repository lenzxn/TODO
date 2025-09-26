const tasks = [];

const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const p = document.querySelector("p");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (/^\s*$/.test(input.value)) {
    alert("Du måste skriva något!");
    return;
  }

  tasks.push({ text: input.value, done: false });
  input.value = "";
  display();
});

function display() {
  taskList.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;

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
      task.done = !task.done;
      display();
    });

    taskList.appendChild(li);
  });

  const doneCount = tasks.filter((t) => t.done).length;
  p.textContent = "Tasks done: " + doneCount;
}
