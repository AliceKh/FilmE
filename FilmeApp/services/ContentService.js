import axios from 'axios';

export function getUploads() {
    axios.get(`http://${global.server}:4000/exploreuploads`)
        .then(response => {
            this.setState({songs: response.data});
        })
        .catch(error => {
            console.log(error);
        });
}