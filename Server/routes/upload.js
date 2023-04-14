import express from 'express'
import {uploadVideoMulter} from "../controllers/uploadVideo.js";

const router = express.Router();

router.route('/video')
    .post(
        uploadVideoMulter.single('file'), (req, res) => {
    res.status(201).json(req.file)
});
// router.route('/audio').post(uploadAudio);

// router.post('/', function(req, res) {
//     console.log(req.body);
//     dbUtils.upload(req.body);
//     res.send('respond with a resource'); // TODO
// });

export {router as uploadRoute};