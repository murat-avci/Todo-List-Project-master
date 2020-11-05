'use strict';

const form = document.querySelector(`#todo-form`);
const todoInput = form.querySelector(`#todo`);
const todoList = document.querySelector(`.list-group`);
const cardBodies = document.querySelectorAll(`.card-body`);
const firstCardBody = cardBodies[0];
const secondCardBody = cardBodies[1];
const filter = document.querySelector(`#filter`);
const clearButton = secondCardBody.querySelector(`#clear-todos`);

eventListeners();

function eventListeners() {
  form.addEventListener(`submit`, addTodo);
  document.addEventListener(`DOMContentLoaded`, loadAllTodosToUI);
  secondCardBody.addEventListener(`click`, deleteTodo);
  filter.addEventListener(`keyup`, filterTodos);
  clearButton.addEventListener(`click`, clearAllTodos);
}

function clearAllTodos() {
  // eslint-disable-next-line no-alert
  if (confirm(`Are you sure want to delete all?`)) {
  // Arayüzden todoları temizleme
    while (todoList.firstElementChild !== null) {
      todoList.removeChild(todoList.firstElementChild);
    }

    localStorage.removeItem(`todos`);
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(`.list-group-item`);

  listItems.forEach(function (listItem) {
    const listItemText = listItem.textContent.toLocaleLowerCase();

    if (listItemText.indexOf(filterValue) === -1) {
      listItem.setAttribute(`style`, `display: none !important`); // bootstrap d-flex classını gölgelemek için kullanılmıştır.
    } else {
      listItem.setAttribute(`style`, `display: block`);
    }
  });
}

function deleteTodo(e) {

  if (e.target.className === `fa fa-remove`) {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

    showAlert(`success`, `Todo has been successfully deleted!`);
  }
}

function deleteTodoFromStorage(delTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === delTodo) {
      todos.splice(index, 1); // array den değer silme işlemi
    }
  });
  localStorage.setItem(`todos`, JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === ``) {
    showAlert(`danger`, `Please enter a Todo!`);
  } else {

    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert(`success`, `Todo has been successfully added.`);

  }

  todoInput.value = ``;

  e.preventDefault();
}

function getTodosFromStorage() { // Storage den todoları çekme işlemi
  let todos;

  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem(`todos`, JSON.stringify(todos));
}

// Uyarı mesajı gösterme

function showAlert(type, message) {
  const alert = document.createElement(`div`);

  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  // setTimeout

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  // List Item oluşturma
  const listItem = document.createElement(`li`);
  // link oluşturma
  const link = document.createElement(`a`);
  link.href = `#`;
  link.className = `delete-item`;
  link.innerHTML = `<i class = "fa fa-remove"></i>`;

  listItem.className = `list-group-item d-flex justify-content-between`;

  // Text Node Ekleme
  const text = document.createTextNode(newTodo);

  listItem.appendChild(text);
  listItem.appendChild(link);

  // todoList e listItem ekleme

  todoList.appendChild(listItem);
}
