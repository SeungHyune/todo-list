const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input[type='text']");
const todoForm = document.querySelector("#todo-form");
const todoList = document.getElementById("todo-list");
const greeting = document.getElementById("greeting");
const logoutBtn = document.querySelector(".header button");
const warningCloseBtn = document.querySelector(".warning button");

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = "username";


function loginOnSubmit(e){
    e.preventDefault();
    const userName = loginInput.value;
    const pattern = /^\s+|\s+$/g;
    if(userName.replace(pattern, '' ) == "" || userName === ""){
        warning.classList.add('show');
    } else {
        loginForm.classList.add(HIDDEN_CLASSNAME);
        todoList.classList.remove(HIDDEN_CLASSNAME);

        loginInput.value = "";
        localStorage.setItem(USERNAME_KEY, userName);
        paintGreetings(userName);
    }

    warningCloseBtn.addEventListener('click', () => {
        warning.classList.remove('show');
    })
}

function logoutSubmit(){
    todoForm.style.opacity = 0;
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    todoList.classList.add(HIDDEN_CLASSNAME);
    greeting.innerText = ``;
    greeting.classList.add(HIDDEN_CLASSNAME);
    logoutBtn.classList.add(HIDDEN_CLASSNAME);

    localStorage.removeItem(USERNAME_KEY);
}

function paintGreetings(username){
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    logoutBtn.classList.remove(HIDDEN_CLASSNAME);
    todoForm.style.opacity = 1;

    logoutBtn.addEventListener('click', logoutSubmit);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    todoList.classList.add(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', loginOnSubmit);
} else {
    paintGreetings(savedUsername);
}

