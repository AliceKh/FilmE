import express from 'express'
import {uploadVideoMulter} from "../controllers/firebaseUpload/uploadVideo.js";
import {uploadAudioMulter} from "../controllers/firebaseUpload/uploadAudio.js";
import {uploadPreviewMulter} from "../controllers/firebaseUpload/uploadPreview.js";

const router = express.Router();

router.route('/video')
    .post(uploadVideoMulter.single('file'), (req, res) => {
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