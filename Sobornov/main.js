const ORIGIN  = 'http://195.19.40.218:1313';


async function loginClicked(){
    const login = document.getElementById('login').value;
    const password = document.getElementById('Pass').value;


    let url = ORIGIN + '/auth/login';    
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            login, password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { token } = await response.json();

    localStorage.setItem('token', token)
    
}

async function loadUsersClicked(){
    const url = ORIGIN + '/users';
    const tk = localStorage.getItem('token')
    response = await fetch (url, {
        headers: {
            auth: tk
        }
    });
    const usersData = await response.json();
    console.log(usersData);
    for(let i = 0; i < usersData.length; i++) {
        btnLoadUsers.innerHTML += `
            <div>
                <img src="${usersData[i].img}?id=${Math.random()}">
                <span>${usersData[i].lastName }</span>
                <span>${usersData[i].firstName}</span>
            </div>
        `;     
    }
}

