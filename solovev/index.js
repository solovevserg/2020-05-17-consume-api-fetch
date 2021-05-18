const ORIGIN = 'http://195.19.40.218:1313';

async  function loadToken(credentials) {
    const url = ORIGIN + '/auth/login';
    const response = await fetch(url, {
        method: 'POST',
        body: credentials,
    });
    const { token } = await response.json();
    return token;
}

async function handleClick() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credentials = { login, password };
    document.getElementById('credentials').innerHTML = JSON.stringify(credentials);
    const token = await loadToken();
    document.getElementById('token').innerHTML = token;
}

async function main() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', handleClick);
}

main();