import express from 'express'
import cors from 'cors'
import {uploadRoute} from "./routes/upload.js";
import { authRoute } from './routes/authentication.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/upload', uploadRoute);
app.use('/auth', authRoute);

app.listen(4000, () => {
    console.log('Server listening on port 3000...');
});