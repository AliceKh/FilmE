import express from 'express'
import cors from 'cors'
import {uploadRoute} from "./routes/upload.js";
import { authRoute } from './routes/authentication.js';
import Upload from './dbSchemas/upload.js'
import User from './dbSchemas/user.js'
import {connectToMongo} from './dbUtils.js'
import { getUploads } from './routes/getUploads.js';
import { getUsers } from './routes/getUsers.js';

const app = express();
app.use(cors())
app.use(express.json());
connectToMongo();

app.use('/upload', uploadRoute);

app.use('/auth', authRoute);
  
app.get('/uploads', getUploads);

app.get('/user/:id', getUsers);

app.listen(4000, () => {
    console.log('Server listening on port 4000...');
});