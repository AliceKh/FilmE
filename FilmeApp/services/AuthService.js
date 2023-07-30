import axios from 'axios';

export function register(email, password, username) {
  return new Promise((resolve, reject) => {
    axios.post(`http://${global.server}:4000/auth/register`, {email: email, password: password, username: username})
      .then(response => {
        resolve();
      })
      .catch(error => {
        errorMessage = error.response ? error.response.data : error;
        reject(JSON.stringify(errorMessage));      
      });
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
  axios.post(`http://${global.server}:4000/auth/login`, {email: email, password: password})
    .then(response => {
      resolve();
    })
    .catch(error => {
      errorMessage = error.response ? error.response.data : error;
      reject(JSON.stringify(errorMessage));
    });
  });
}