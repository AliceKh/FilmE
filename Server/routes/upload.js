import express from 'express'
import multer from 'multer';
import {insertUpload} from "../controllers/db/upload.js";
import {uploadVideoMulter} from "../controllers/firebaseStorageUpload/uploadVideo.js";
import {uploadAudioMulter} from "../controllers/firebaseStorageUpload/uploadAudio.js";
import {uploadPreviewMulter} from "../controllers/firebaseStorageUpload/uploadPreview.js";
import { bucketName, firebaseInstance, storage, auth } from '../firebaseUtils.js';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import e from 'express';
import fs from 'fs'

const router = express.Router();

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

const upload = multer({ storage: multerStorage });

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

router.route('/video').post(upload.single('file'), (req, res) => {
    try {
        const currentUser = auth.currentUser;
        const file = req.file;
        console.log(file);

        if (currentUser) {
        const storageRef = ref(storage, `video/test.mp4`);
        console.log(req.file);

        fs.readFile(req.file.path, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                uploadBytes(storageRef, data).then((snapshot) => {
                    console.log('Uploaded a file!');
                })
            }
        })
        //await uploadBytes(storageRef, fileData, { contentType: fileType });
    
        // Get the download URL using getDownloadURL() method
        //const downloadURL = await getDownloadURL(storageRef);
    
        //res.json({ downloadURL });
        res.status(201).json(req.file);
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