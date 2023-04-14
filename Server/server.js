const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
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

/*const newUpload = new Uploads({
  LinkToStorage: 'gs://filme-4277e.appspot.com/video/video/pexels-cottonbro-studio-2785533-2160x3840-25fps.mp4',
  LinkToPreviewImage: 'gs://filme-4277e.appspot.com/images/my-image.jpg',
  Title: 'My Awesome Video',
  Uploader: '64306b71dd045edb9b98d52d',
  DateWhenUploaded: new Date(),
  Type: 'video',
  Tags: ['funny', 'cat', 'comedy'],
  NumberOfReactions: 10,
  ListOfReactions: [
    '61632c454e982d16a7f2b2c3',
  ]
});*/

/*newUpload.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Document inserted successfully');
  }
});*/

// if (process.env.NODE_ENV == "development") {
//     const swaggerUI = require("swagger-ui-express")
//     const swaggerJsDoc = require("swagger-jsdoc")
//     const options = {
//         definition: {
//             openapi: "3.0.0",
//             info: {
//                 title: "Node Demo API",
//                 version: "1.0.0",
//                 description: "A simple Express Library API",
//             },
//             servers: [{url: "http://localhost:" + process.env.PORT,},],
//         },
//         apis: ["./routes/*.js"],
//     };
//     const specs = swaggerJsDoc(options);
//     app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
//  }


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



// const port = process.env.PORT

// const indexRouter = require('./routes/index')
// app.use('/',indexRouter)

// const postRouter = require('./routes/post_routes')
// app.use('/post',postRouter)

// const authRouter = require('./routes/auth_routes')
// app.use('/auth',authRouter)

module.exports = app