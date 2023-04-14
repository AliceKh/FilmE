import express from 'express'
import cors from 'cors'
import {uploadRoute} from "./routes/upload.js";

const app = express();
app.use(cors())
app.use(express.json());

app.use('/upload', uploadRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});