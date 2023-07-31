import axios from 'axios';

export function register(email, password, username) {
    return new Promise((resolve, reject) => {
        axios.post(`http://${global.server}:4000/auth/register`, {
            email: email, password: password, username: username
        }, {timeout: 15000})
            .then(response => {
                resolve();
            })
            .catch(error => {
                errorMessage = error.response ? error.response.data : error.message;
                reject(JSON.stringify(errorMessage));
            });
    });
}

export function login(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(`http://${global.server}:4000/auth/login`, {email: email, password: password}, {timeout: 15000})
            .then(response => {
                resolve();
            })
            .catch(error => {
                errorMessage = error.response ? error.response.data : error.message;
                reject(JSON.stringify(errorMessage));
            });
    });
}