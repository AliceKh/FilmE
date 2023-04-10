const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

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
        cb(null, './uploads/');
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

 const uploadSchema = new mongoose.Schema({
    LinkToStorage: {type: String, required: true},
    LinkToPreviewImage: {type: String, required: true},
    Title: {type: String, required: true},
    Uploader: {type: mongoose.Types.ObjectId, required: true},
    DateWhenUploaded: {type: Date, required: true},
    Type: ['video','audio'],
    Tags: [{type: String, required: true}],
    NumberOfReactions: {type: Number, required: true},
    ListOfReactions: [{type: mongoose.Types.ObjectId, required: true}],
  });
  const Video = mongoose.model('Uploads', uploadSchema);

  app.post('/upload', upload.single('video'), async (req, res) => {
    try {
      // Save the video information to MongoDB
      const video = new Video({
        LinkToStorage: `https://my-storage-service.com/${req.file.originalname}`,
        LinkToPreviewImage: `https://my-preview-service.com/${req.file.originalname}`,
        Title: req.body.title,
        Uploader: req.body.uploader,
        DateWhenUploaded: new Date(),
        Type: req.body.type,
        Tags: req.body.tags,
        NumberOfReactions: 0,
        ListOfReactions: []
      });
      await video.save();
  
      res.status(201).json({ message: 'File uploaded successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });



// const port = process.env.PORT

// const indexRouter = require('./routes/index')
// app.use('/',indexRouter)

// const postRouter = require('./routes/post_routes')
// app.use('/post',postRouter)

// const authRouter = require('./routes/auth_routes')
// app.use('/auth',authRouter)

module.exports = app