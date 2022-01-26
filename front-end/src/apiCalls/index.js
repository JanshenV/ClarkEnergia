async function UserSignUp(userData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(userData)
        };

        const BASE_URL = process.env.REACT_APP_BASE_URL;

        const serverRequest = await fetch(`${BASE_URL}/users`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch ({ message }) {
        return console.log(message)
    };
};

module.exports = {
    UserSignUp
}