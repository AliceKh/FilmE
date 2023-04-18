import express from 'express'
import cors from 'cors'
import {uploadRoute} from "./routes/upload.js";
//import { getUploads } from './routes/getUploads.js';
import Upload from './dbSchemas/upload.js'
import User from './dbSchemas/user.js'
import {connectToMongo} from './dbUtils.js'

const app = express();
app.use(cors())
app.use(express.json());
connectToMongo();

app.use('/upload', uploadRoute);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
  
app.get('/uploads', async (req, res) => {
    try{
        const uploads = await Upload.find().populate({ path: 'Uploader', model: 'Users' }).lean()
        res.json(uploads);
        } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error retrieving uploads' });
        };
});

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .populate('ListOfFollowers')
      .populate('ListOfFollowing')
      .populate('ListOfReactions')
      .populate('ListOfUploads')
      .exec((err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(user);
        }
      });
});

app.listen(4000, () => {
    console.log('Server listening on port 4000...');
});