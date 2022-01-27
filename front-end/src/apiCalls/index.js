const BASE_URL = process.env.REACT_APP_BASE_URL;

async function UserSignUp(userData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(userData)
        };

        const serverRequest = await fetch(`${BASE_URL}/users`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch ({ message }) {
        return console.log(message)
    };
};

async function UserLogin(userData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(userData)
        };

        const serverRequest = await fetch(`${BASE_URL}/users/login`, requestOptions);
        const { message, token } = await serverRequest.json();

        if (token) return { token };
        return { message };
    } catch ({ message }) {
        return console.log(message)
    };
};

async function UserProfile(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': token
            }
        };

        const serverRequest = await fetch(`${BASE_URL}/users/login`, requestOptions);
        const serverResponse = await serverRequest.json();

        return console.log(serverResponse);
    } catch ({ message }) {
        return message;
    };
};

module.exports = {
    UserSignUp,
    UserLogin
}