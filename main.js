function setBackground() {
        const randomNumber = Math.random();
        let color = 'red'
        if(randomNumber > 0.5) {
            color = 'green';
        } 
        document.body.style.background = color;
}

// setTimeout(setBackground, 1000);

// Промисификация таймера
function setPromiseTimeout(durationMs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), durationMs);
    });
}

const promise = setPromiseTimeout(1000);
promise.then(setBackground);
promise.then(() => console.log('end'));

// Пример той же загрузки данных с помощью fetch и Promise,
// но без использования async/await. Тут реализовн Promise Chaining.
// const asyncRequest = fetch('/data.json');
// asyncRequest.then(response => {
//     return response.json()
// }).then(
//     body => console.log(body)
// );

async function loadVersion() {
    const response = await fetch('/data.json');
    const body = await response.json();
    return body;
}

async function main() {
    const version = await loadVersion();
    console.log(version);
}

main()