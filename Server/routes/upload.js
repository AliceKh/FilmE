import express from 'express'
import {insertUpload} from "../controllers/db/upload.js";
import {uploadVideoMulter} from "../controllers/firebaseStorageUpload/uploadVideo.js";
import {uploadAudioMulter} from "../controllers/firebaseStorageUpload/uploadAudio.js";
import {uploadPreviewMulter} from "../controllers/firebaseStorageUpload/uploadPreview.js";
import { bucketName, firebaseInstance, storage, auth } from '../firebaseUtils.js';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import e from 'express';

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
        const currentUser = auth.currentUser;
        const { file } = req.body;
        console.log(file);
    
        // Read the file data from req.files.file
        const fileData = file.data;
        const fileName = file.name;
        const fileType = file.mimetype;
    
        if (currentUser) {
        const storageRef = ref(storage, `video/${fileName}`);

        await uploadBytes(storageRef, fileData, { contentType: fileType });
    
        // Get the download URL using getDownloadURL() method
        const downloadURL = await getDownloadURL(storageRef);
    
        res.json({ downloadURL });
      }
     else{
        res.status(401).json({ error: 'User is not authenticated' });
     }
     
     }catch (error) {
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