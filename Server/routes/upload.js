import express, { response } from 'express'
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

function setDate(nametype){
    var today = new Date();
    const filename = nametype.substring(0,3).toUpperCase()
                                             + today.getFullYear().toString().substring(2,4)
                                             + (today.getMonth() + 1)
                                             + today.getDate() + "_"
                                             + today.getHours()
                                             + today.getMinutes()
                                             + today.getSeconds()

    return filename;
}

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
    console.log(upload)
    console.log("Server upload: " + upload['LinkToPreviewImage']);
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

router.route('/video').post(upload.single('file'), (req, res) => {
    try {
        const currentUser = auth.currentUser;
        const file = req.file;

        file.originalname = setDate(file.mimetype);
        if (currentUser) {
        const storageRef = ref(storage, `video/${file.originalname}`);
        fs.readFile(req.file.path, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                uploadBytes(storageRef, data, {contentType: 'video/mp4'}).then((snapshot) => {
                    console.log('video uploaded!');
                })
            }
        })
        res.status(201).json(file);
      }
     else{
        res.status(401).json({ error: 'User is not authenticated' });
     }

     }catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
      }   
  });
    
router.route('/audio').post(upload.single('file'), (req,res) => {
    try {
        const currentUser = auth.currentUser;
        const file = req.file;
        file.originalname = setDate(file.mimetype);

        if (currentUser) {
        const storageRef = ref(storage, `audio/${file.originalname}`);
        fs.readFile(req.file.path, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                uploadBytes(storageRef, data, {contentType: 'audio/mp3'}).then((snapshot) => {
                    console.log('audio uploaded!');
                })
            }
        })
        res.status(201).json(file);
      }
     else{
        res.status(401).json({ error: 'User is not authenticated' });
     }

     }catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})

router.route('/image').post(upload.single('file'), (req, res) => {
    try {
        const currentUser = auth.currentUser;
        const file = req.file;
        file.originalname = setDate(file.mimetype);

        if (currentUser) {
        const storageRef = ref(storage, `preview/${file.originalname}`);
        fs.readFile(req.file.path, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                uploadBytes(storageRef, data, {contentType: 'image/jpeg'}).then((snapshot) => {
                    console.log('preview image uploaded!');
                })
            }
        })
        res.status(201).json(file);
      }
     else{
        res.status(401).json({ error: 'User is not authenticated' });
     }

     }catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    });

export {router as uploadRoute};