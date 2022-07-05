// Variaveis:
let allTasks = [];
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("taskList"));

// HTML:
const input = document.querySelector("#inputText");
const btnInsert = document.querySelector("#btnInsert");
const btnClear = document.querySelector("#btnRemoveAll");
const taskList = document.querySelector("#listItems");

//Eventos:
btnInsert.addEventListener("click", addTask);
btnClear.addEventListener("click", cleanAll);

input.addEventListener("keypress", (e) =>{
    if(e.key === "Enter") addTask();    
});

taskList.addEventListener(
  "dblclick", (e) =>{ e.target.className += " completo";}
);

if (tasksFromLocalStorage) {
  allTasks = [...tasksFromLocalStorage];
}
renderTasks(allTasks);

// Funções:
function addTask() {
  if (input.value === "") return;

  let task = input.value;

  const li = document.createElement("li");
  li.className = "item-lista";
  li.appendChild(document.createTextNode(task));

  taskList.appendChild(li);
  allTasks.push(task);
  saveToLocalStorage(allTasks);
  input.value = "";
}

function cleanAll() {
  if (confirm("Você tem certeza de que quer remover todas as tarefas?")) {
    taskList.innerHTML = "";
    allTasks = [];
    saveToLocalStorage(allTasks);
  }
}

function saveToLocalStorage(tasks) {
  allTaskString = JSON.stringify(tasks);
  localStorage.setItem("taskList", allTaskString);
}

function renderTasks(tasks) {
  list = "";

  for (let i = 0; i < tasks.length; i++) {
    list += `
        <li class="item-lista">${tasks[i]}</li>
        `;
  }
  taskList.innerHTML = list;
}
