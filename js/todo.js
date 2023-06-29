const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

let todos = [];
const TODO_KEY = 'todos'

function saveTodos(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function todoDelete(e){
    const li = e.target.parentElement;
    li.remove();
    todos = todos.filter(todo => todo.id !== Number(li.id));
    saveTodos();
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    span.innerText = newTodo.text;
    button.innerText = 'X';
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);

    button.addEventListener('click', todoDelete);
}

function handleTodoSubmit(e){
    e.preventDefault();
    const newTodo = todoInput.value;
    const newTodoObj = {text:newTodo,id:Date.now()};
    todos.push(newTodoObj);
    todoInput.value = "";
    paintTodo(newTodoObj);

    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    todos = parsedToDos;
    parsedToDos.forEach((todo) => {
        paintTodo(todo)
        // const li = document.createElement('li');
        // const span = document.createElement('span');
        // const button = document.createElement('button');
        // span.innerText = todo;
        // button.innerText = 'X';
        // li.appendChild(span);
        // li.appendChild(button);

        // todoList.appendChild(li);
    })
}
