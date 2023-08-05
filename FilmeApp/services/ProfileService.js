import axios from 'axios';

export function getCurrentUser(){
    return new Promise((resolve, reject) =>{
        axios.get(`http://${global.server}:4000/profileuser`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });    
}

export function getUsersUploads(){
    return new Promise((resolve, reject) => {
        axios.get(`http://${global.server}:4000/uploads`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}