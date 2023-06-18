import express from 'express'
import {insertUpload} from "../controllers/db/upload.js";
import {uploadVideoMulter} from "../controllers/firebaseStorageUpload/uploadVideo.js";
import {uploadAudioMulter} from "../controllers/firebaseStorageUpload/uploadAudio.js";
import {uploadPreviewMulter} from "../controllers/firebaseStorageUpload/uploadPreview.js";
import { bucketName, firebaseInstance, storage, auth } from '../firebaseUtils.js';
import { ref, uploadBytes } from 'firebase/storage';

const router = express.Router();

router.post('/', function (req, res) {
    let upload = req.body;
    console.log(upload);
    upload['DateWhenUploaded'] = Date.now();
    upload['NumberOfReactions'] = 0;
    upload['ListOfReactions'] = [];
    if (!!upload['Tags']) {
        upload['Tags'] = upload['Tags'].split(' ');
    }
    if (!!upload['TimeStamps']) {
        upload['TimeStamps'] = upload['TimeStamps'].split(' ')
    }
    insertUpload(req.body).then(r => console.log(r));
    res.send('respond with a resource');
});

// router.route('/video')
//     .post(uploadVideoMulter.single('file'), (req, res) => {
//         res.status(201).json(req.file)
//     });

router.route('/video').post(async (req, res) => {
    try {
        const { uri, name, type } = req.body;
    
        const currentUser = auth.currentUser;
    
        if (currentUser) {
          const storageRef = firebaseInstance.storage().bucket().file(`video/${name}`);
          const snapshot = await storageRef.save(uri, { contentType: 'video/mp4' });
    
          // Get the download URL using getSignedUrl() method
          const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket.name}/o/${encodeURIComponent(storageRef.name)}?alt=media`;
    
          res.json({ downloadURL });
        } else {
          res.status(401).json({ error: 'User is not authenticated' });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
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