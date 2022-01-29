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
                'authorization': token
            }
        };

        const serverRequest = await fetch(`${BASE_URL}/users/profile`, requestOptions);
        const { user } = await serverRequest.json();

        return { user };
    } catch ({ message }) {
        return message;
    };
};

async function UserEdit(token, data) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        };

        const serverRequest = await fetch(`${BASE_URL}/users`, requestOptions);
        const { message, user } = await serverRequest.json();

        if (message) {
            console.log(message);
            return { message };
        };

        return { user };
    } catch ({ message }) {
        return message;
    };
};

async function SuppliersList(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            }
        };

        const serverRequest = await fetch(`${BASE_URL}/suppliers`, requestOptions);
        const serverResponse = await serverRequest.json();

        if (serverRequest.status !== 200) {
            console.log('Error in suppliersList');
            return [];
        };

        return { serverResponse };
    } catch ({ message }) {
        return message;
    };
};

async function SingleSupplier(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            }
        };

        const serverRequest = await fetch(`${BASE_URL}/suppliers/mysupplier`, requestOptions);
        const { message, supplier } = await serverRequest.json();

        if (message) {
            return console.log(message);
        };

        return { supplier };
    } catch ({ message }) {
        return message;
    };
};

async function CreateSupplier(token, data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        };

        const serverRequest = await fetch(`${BASE_URL}/suppliers`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch ({ message }) {
        return message;
    };
};

module.exports = {
    UserSignUp,
    UserLogin,
    UserProfile,
    UserEdit,
    SuppliersList,
    SingleSupplier,
    CreateSupplier
};