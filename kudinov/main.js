const origin ='http://195.19.40.218:1313';

function saveToken(token) {
    localStorage.setItem('token', token);    
}

async function loadToken(login, password) {
    const url = origin + '/auth/login';    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            login, password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { token } = await response.json();
    saveToken(token);    
}

async function handleClick() {
    const login = document.getElementsByClassName('login')[0].value;
    const password = document.getElementsByClassName('password')[0].value;    
    
    loadToken(login, password);
}

async function loadUsers() {
    const token = localStorage.getItem('token');
    const url = origin + '/users';
    const users = document.getElementsByClassName('users')[0];
    const response = await fetch(url, {
        headers: {
            auth: token
        }
    });
    const usersData = await response.json();
    console.log(usersData);
    for(let i = 0; i < usersData.length; i++) {
        users.innerHTML += `
            <div>
                <img src="${usersData[i].img}?id=${Math.random()}">
                <span>${usersData[i].lastName }</span>
                <span>${usersData[i].firstName}</span>
            </div>
        `;     
    }
}

async function main() {
    const submitButton = document.getElementsByClassName('button')[0];
    submitButton.addEventListener('click', handleClick);
    const getButton = document.getElementsByClassName('getUsers')[0];
    getButton.addEventListener('click', loadUsers);
}

main();