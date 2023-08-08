import axios from 'axios';

export function getUploads() {
    return new Promise((resolve, reject) => {
        axios.get(`http://${global.server}:4000/exploreuploads`)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
}