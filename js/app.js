const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input[type='text']");
const greeting = document.getElementById("greeting");

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = "username";


function loginOnSubmit(e){
    e.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);

    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName);

    paintGreetings(userName);
}

function paintGreetings(username){
    greeting.innerText = `Hello, ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', loginOnSubmit);
} else {
    paintGreetings(savedUsername);
}