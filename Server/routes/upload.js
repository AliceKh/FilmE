import express from 'express'
import {insertUpload} from "../dbUtils.js";
import {uploadVideoMulter} from "../controllers/firebaseStorageUpload/uploadVideo.js";
import {uploadAudioMulter} from "../controllers/firebaseStorageUpload/uploadAudio.js";
import {uploadPreviewMulter} from "../controllers/firebaseStorageUpload/uploadPreview.js";
import {firebaseInstance} from "../firebaseUtils.js";


const router = express.Router();


router.post('/', function(req, res) {
    let upload = req.body;
    console.log(upload);
    upload['DateWhenUploaded'] = Date.now();
    upload['NumberOfReactions'] = 0;
    upload['ListOfReactions'] = [];
    if (!!upload['Tags']){
        upload['Tags'] = upload['Tags'].split(' ');
    }
    if (!!upload['TimeStamps']){
        upload['TimeStamps'] = upload['TimeStamps'].split(' ')
    }
    insertUpload(req.body).then(r => console.log(r));
    res.send('respond with a resource');
});

router.route('/video')
    .post(uploadVideoMulter.single('file'), (req, res) => {
        console.log("vlad", res.file)
        res.status(201).json(req.file)
    });
router.route('/audio')
    .post(uploadAudioMulter.single('file'), (req, res) => {
        res.status(201).json(req.file)
    });

router.route('/preview')
    .post(uploadPreviewMulter.single('file'), (req, res) => {
        res.status(201).json(req.file)
    });

export {router as uploadRoute};