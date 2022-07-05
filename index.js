
// Variaveis:
let allTasks = [];
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("taskList"));

// HTML:
const input = document.querySelector("#inputText");
const btnInsert = document.querySelector("#btnInsert");
const btnClear = document.querySelector("#btnRemoveAll");
const taskList = document.querySelector("#listItems");
const temp = document.querySelector("#temp");
const maxTemp = document.querySelector("#max-temp");
const minTemp = document.querySelector("#min-temp");

//Eventos:
btnInsert.addEventListener("click", addTask);
btnClear.addEventListener("click", cleanAll);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

taskList.addEventListener("dblclick", (e) => {
  e.target.className += " completo";
  let index = allTasks.findIndex(
    (task) => task.taskName === e.target.textContent
  );
  allTasks[index].isComplete = true;
  saveToLocalStorage(allTasks);
}
);

if (tasksFromLocalStorage) {
  allTasks = [...tasksFromLocalStorage];
}
renderTasks(allTasks);
getWeatherData();


// Funções:
function addTask() {
  if (input.value === "") return;

  let task = input.value;

  const li = document.createElement("li");
  li.className = "item-lista";
  li.appendChild(document.createTextNode(task));

  taskList.appendChild(li);
  allTasks.push({ taskName: task, isComplete: false });
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
        <li class="item-lista ${tasks[i].isComplete ? "completo" : ""}">
        ${tasks[i].taskName}
        </li>
        `;
  }
  taskList.innerHTML = list;
}

async function getWeatherData() {
  // função assíncrona porque se deve esperar uma resposta, que não necessariamente vai ser instantânea
  const apiKey = "47e811d46816fb69a6cd719759c80f18"; // código da API retirado da dashboard do site
  const units = "metric"; // opção da API, para usar a unidade padrão (ºC)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=-21.7642&lon=-43.3496&appid=${apiKey}&units=${units}&lang=pt_br`; // URL, para ficar fácil de alterar

  await fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        return new Error("falha a requisição");
      }
      if (response.status === 404) {
        return new Error("não encontrou qualquer resultado");
      }
      return response.json().then((text) => {
        temp.textContent = "Temperatura atual: " + text.main.temp;
        maxTemp.textContent = "Temperatura máxima: " + text.main.temp_max;
        minTemp.textContent = "Temperatura mínima: " + text.main.temp_min;
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}