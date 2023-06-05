import axios from 'axios';

export function sendReactions(reactions) {
        axios.post('http://192.168.209.79:4000/reactions', {reactions: reactions})
          .then(response => {
            console.log("reactions sent");
          })
          .catch(error => {
            console.log(error);
          });

}