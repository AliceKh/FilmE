import axios from 'axios';

export function sendReactions(uri, time, mediaId) {
    let formData = new FormData();
    let type = `image/jpeg`;

    // TODO: append more parameters as needed
    formData.append('photo', { uri: uri, name: 'filename', type});

    let seconds = time;
    let minutes = 0;

    if(seconds >= 60) {
        minutes = Math.floor(time/60);
        seconds = seconds - (60 * minutes);
    }
    
    seconds =  seconds < 10 ? "0" + seconds : seconds;

    formData.append('timestamp', "0" + minutes + ":" + seconds);
    formData.append('reactionTo', mediaId);

    axios.get(`http://192.168.1.207:4000/profileuser`)
    .then(response => {
        formData.append('userReacting', response.data._id);
        
        axios.post('http://localhost:4000/reactions', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
            console.log("file sent");
        }).catch(err => {
            console.log(err);
        });
    })
    .catch(error => {
        console.log(error);
    });
    
    // axios.post('http://localhost:4000/reactions', {reactions: reactions})
    //     .then(response => {
    //         console.log("reactions sent");
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

}