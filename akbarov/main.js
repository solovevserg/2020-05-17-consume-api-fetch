const span = document.getElementById('result');
span.innerHTML = localStorage.getItem('token') ? 'Successful' : 'Enter login and password';
const users = document.getElementById('users');

async function loginClick() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    if(login !== 'admin' || password !== 'admin') { 
        span.innerHTML = localStorage.getItem('token') 
        ? 'You are already logged in'
        : 'Incorrect login or password';
    }
    else {
        span.innerHTML = 'Successful';
        const res = await fetch('http://195.19.40.218:1313/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                login, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        localStorage.setItem('token', json.token);
    }
}

async function logoutClick() {
    if(localStorage.getItem('token')) localStorage.removeItem('token');
    span.innerHTML = 'Enter login and password';
}

async function loadUsers() {
    const token = localStorage.getItem('token');
    if(!token) span.innerHTML = 'Token is not found';
    else {
        const res = await fetch('http://195.19.40.218:1313/users', {
            headers: {
                auth: token
            }
        });
        const json = await res.json();
        for(record of json) {
            users.innerHTML += `
                <div class='usercard'>
                    <img src="${record.img}?id=${Math.random()}}" alt="photo">
                    <p>${record.lastName}</p>
                    <p>${record.firstName}</p>
                </div>
            `;
        }
    }
}