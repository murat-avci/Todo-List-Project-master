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

function eventListeners () {
    form.addEventListener(`submit`, addTodo);
};

function addTodo (e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === ``) {
        showAlert(`danger`, `Lütfen bir Todo giriniz!`);
    } else {
        addTodoToUI(newTodo);
        showAlert(`success`, `Todo başarı ile eklenmiştir.`);
    }

    todoInput.value = ``;
    
    e.preventDefault();
}

// Uyarı mesajı gösterme

function showAlert (type, message) {
    const alert = document.createElement(`div`);

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // setTimeout

    setTimeout(function () {
        alert.remove();
    }, 2000);
}

function addTodoToUI (newTodo) {
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

    //todoList e listItem ekleme

    todoList.appendChild(listItem);
}
