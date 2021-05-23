function getToken() {
    let storage = window.localstorage;
    const password = document.getElementById('password');
    const login = document.getElementById('login');

    let credentials = {
        login: login.value,
        password: password.value
    }

    const url = `http://195.19.40.218:1313/auth/login`;

    fetch(url, {
        method: 'POST',
        body: credentials

    })
        .then((response) => {
            return response.json();
        })
        .then(({token}) => {
            storage.setItem("token", token);
        });
}


function main() {
    const okButton = document.getElementById('ok');
    okButton.addEventListener('click', event => getToken())
}


main()