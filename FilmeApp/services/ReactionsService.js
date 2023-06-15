import axios from 'axios';

export function sendReactions(uri, time, mediaId) {
    let formData = new FormData();
    let type = `image/jpeg`;

    // TODO: append more parameters as needed
    formData.append('photo', { uri: uri, name: 'filename', type});

    axios.post('http://localhost:4000/reactions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
       console.log("file sent");
    }).catch(err => {
        console.log(err);
    });
    
    // axios.post('http://localhost:4000/reactions', {reactions: reactions})
    //     .then(response => {
    //         console.log("reactions sent");
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

}