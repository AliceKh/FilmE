import express from 'express'
import multer from "multer";
import axios from "axios";
import FormData from 'form-data';
import fs from "fs";
import {createOrUpdateReaction} from "../controllers/reaction.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/', filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname + ".jpg");
    }
});
const upload = multer({storage: storage});

router.post('', upload.single('photo'), async (req, res) => {

    const {reactionTo, userReacting, timestamp} = req.body;
    let formData = new FormData();

    const fileLocation = `./${req.file.path}`

    formData.append('image', fs.createReadStream(fileLocation));

    await axios.post('http://localhost:3001/emotions', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
    }).then(async (response) => {
        let reactionData = response.data.ReactionMetadata;

        reactionData = {
            ...reactionData, timestamp: timestamp,
        };

        console.log(reactionData);

        try {
            await createOrUpdateReaction(userReacting, reactionTo, reactionData);
        } catch (e) {
            res.status(400).send("couldn't save reaction properly");
        }
        res.send('reaction saved successfully!');
    }).catch((error) => {
        res.status(400).send({error: "cant analyse image"});
    }).finally(()=>{
        fs.unlink(fileLocation, (err) => {
            if (err) throw err;
            console.log(`${fileLocation} was deleted`);
        });
    });
});

export {router as reactRoute};
