function addEventListener() {
    document.querySelector('#loginBtn').addEventListener('click', async () => {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        login(username, password);
    })
}

window.onload = addEventListener;

async function login(username, password) {
    const displayError = (msg) => {
        document.querySelector('#errorMsg').innerHTML = msg;
    }

    try {
        await authenticate(username, password);

        window.location.replace('./index.html');
    } catch(error){
        displayError(error);
    }
}