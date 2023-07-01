const todoInput = document.querySelector("#todo-form input");
const warning = document.querySelector(".warning");

let todos = [];
const TODO_KEY = 'todos';
const CHECK_KEY = 'check';

function saveTodos(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function todoDelete(e){
    const li = e.target.parentElement;
    li.remove();
    todos = todos.filter(todo => todo.id !== Number(li.id));
    saveTodos();
}

function strikethrough(e){
    const li = e.target.parentElement;
    const span = e.target;
    let idx;
    let obj = {};
    const todoLi = todos.filter((todo,i) => {
        if(todo.id === Number(li.id)){
            idx = i;
            obj.text = todo.text;
            obj.id = todo.id;
            obj.check = todo.check;
            return todo.id === Number(li.id);
        }
    });
    
    if(!obj.check){
        span.classList.add(CHECK_KEY);
        obj.check = true;
        todos[idx] = obj;
    } else {
        span.classList.remove(CHECK_KEY);
        obj.check = false;
        todos[idx] = obj;
    }
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

    if(newTodo.check){
        span.classList.add(CHECK_KEY);
    }

    button.addEventListener('click', todoDelete);
    span.addEventListener('click', strikethrough);
}

function handleTodoSubmit(e){
    e.preventDefault();
    const newTodo = todoInput.value;
    const pattern = /^\s+|\s+$/g;
    if(newTodo.replace(pattern, '' ) == "" || newTodo === ""){
        warning.classList.add('show');
    } else {
        const newTodoObj = {text:newTodo,id:Date.now(),check:false};
        todos.push(newTodoObj);
        todoInput.value = "";
        paintTodo(newTodoObj);

        saveTodos();
    }

    warningCloseBtn.addEventListener('click', () => {
        warning.classList.remove('show');
    })
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
