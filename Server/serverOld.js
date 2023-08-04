const dotenv = require('dotenv').config()
const express = require('express')
export const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const Uploads = require('./Uploads');
const Users = require('./Users');

const admin = require("firebase-admin");

const serviceAccount = require("../Server/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'filme-4277e.appspot.com'
});

const bucket = admin.storage().bucket();

const videoFileRef = bucket.file('video/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764.mp4');

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads/');
      },
      filename: function (req, file, cb) {
        cb(null,file.originalname);
      }
});

const upload = multer({ storage: storage });

 mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
 const db = mongoose.connection
 db.on('error',error=>{console.error(error)})
 db.once('open',()=>{console.log('db connected!')})

 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

 app.get('/uploads', async (req, res) => {
  try{
    const uploads = await Uploads.find().populate({ path: 'Uploader', model: 'Users' })
    res.json(uploads);
    } catch(error){
      console.log(error);
      res.status(500).json({ error: 'Error retrieving uploads' });
    };
});


 // TODO either change name or clean it