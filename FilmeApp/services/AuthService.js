import axios from 'axios';

export function register(email, password, username) {
  return new Promise((resolve, reject) => {
    axios.post('http://192.168.1.29:4000/auth/register', {email: email, password: password, username: username})
      .then(response => {
        console.log("Signed up sucessfully");
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
  axios.post('http://192.168.1.29:4000/auth/login', {email: email, password: password})
    .then(response => {
      console.log("Loged in sucessfully");
      resolve();
    })
    .catch(error => {
      reject(error);
    });
  });
}