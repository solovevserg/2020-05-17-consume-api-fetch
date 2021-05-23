const span = document.getElementById('result');
span.innerHTML = localStorage.getItem('token') ? 'Successful' : 'Please, sign in';
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
        
        data = {
            "login": login,
            "password": password
          }
        
        const token = fetch('http://195.19.40.218:1313/auth/login', { method: 'POST', body: data }).then(r => r.json())

        localStorage.setItem('token', token);
    }
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
        for(let i = 0; i < json.length; i++) {
            users.innerHTML += `
                <div class='usercard'>
                    <img src="${json[i].img}?id=${Math.random()}}" alt="photo">
                    <p>${json[i].lastName}</p>
                    <p>${json[i].firstName}</p>
                </div>
            `;
            console.log(json[i].img);
        }
    }
}