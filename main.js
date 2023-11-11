//? Aqui invocamos el objeto document para poder obtener control sobre el HTML
const inputTask = document.getElementById("inputTarea");
const tasks = document.getElementById("tareas");

//? Aqui declaramos que nuestra variable taskList siempre va a provenir del localstorage o va a ser un arreglo vacío
let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
//? Esta es una variable auxiliar para indicar a nuestra función editTask que es lo que va a editar
let indexEditar = null


//? Esta clase será nuestra plantilla para crear cualqier objeto y puede tener cualquier cantidad de valores asignados
class Task {
  constructor(tarea){
    this.tarea = tarea;
  }
}

//? Esta función tiene el proposito de darle dos comportamientos a nuestro botón Agregar tarea
const saveTask = () => {
  let tarea = inputTask.value;
  let task = new Task(tarea);
  if(indexEditar === null){
    //! La primer función es agregar una nueva tarea a nuestro arreglo de localstorage
    console.log("Agregar tarea");
    tasksList.push(task);
  } else {
    //! La segunda función es confirmar los valores cuando se esta editando una tarea
    tasksList[indexEditar] = task;
    indexEditar = null;
    console.log("Editar tarea");
  }
  clearForm();
  //* Siempre que usamos estas dos instrucciones le pasamos un arreglo modificado al localstorage y una vez modificado se renderiza
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  renderList();
}

//? Esta función elimina todos los valores del localstorage para luego crear taskList como un arreglo vacio
const clearAll = () => {
  localStorage.clear();
  tasksList = [];
  alert("Se eliminaron todas las tareas");
}

//? Esta función elimina individualmente un elemento de nuestro arreglo y lo que le indica cual eliminar es el parámetro index
const deleteTask = (index) => {
  tasksList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  renderList();
}

//? Esta función edita individualmente un elemento de nuestro arreglo y lo que le indica cual eliminar es el parámetro index
const editTask = (index) => {
  let taskToEdit = tasksList[index];
  inputTask.value = taskToEdit.tarea;
  indexEditar = index;
}

//? Esta función evalua si existen tareas y si existen las muestra en pantalla
const renderList = () => {
  if(tasksList.length === 0){
    tasks.innerHTML = `
      <div>
        no hay tareas
      </div>
    `;
  } else {
    tasks.innerHTML = "";
    tasksList.forEach(({tarea}, index) => {
      tasks.innerHTML += `
        <div>
          <h3>${tarea}</h3>
          <button type="button" id="edit-${index}" onclick="editTask(${index})">Editar</button>
          <button type="button" id="delete-${index}" onclick="deleteTask(${index})">Eliminar</button>
        </div>
      `;
    });
  }
}

//? Esta función limpia el/los input(s) por experiencia de usuario
const clearForm = () => {
  inputTask.value = "";
}

renderList();