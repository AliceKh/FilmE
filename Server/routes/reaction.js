import express from 'express'
import {createOrUpdateReaction} from "../controllers/reaction.js"
import multer from "multer";
import axios from 'axios';

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('', upload.single('photo'), async (req, res) => {
    const imageFile = req.file;
    const { reactionTo, userReacting, timestamp } = req.body;

    try {
        let reactionData = await axios.post('http://localhost:3001/emotions', {
            file: imageFile
        });

        reactionData = {
            ...reactionData,
            timestamp: timestamp,
        };

        await createOrUpdateReaction(userReacting, reactionTo, reactionData);
        res.send('reaction saved successfully!');
    } catch (e) {
        console.log(e);
        res.send('reaction save failed');
    }
});

export {router as reactRoute};