import express from 'express'
import {createOrUpdateReaction} from "../controllers/reaction.js"

const router = express.Router();

router.post('', async (req, res) => {
    const imageFile = req.files.image;
    const timestamp = req.body.timestamp;
    const userId = req.body.userId;
    const reactingToId = req.body.reactingToId;

    try {
        let reactionData = await axios.post('http://localhost:3001/emotions', {
            file: imageFile
        });

        reactionData = {
            ...reactionData,
            timestamp: timestamp,
        };

        createOrUpdateReaction(userId, reactingToId, reactionData);
        res.send('reaction saved successfully!');
    } catch (e) {
        res.send('reaction save failed');
    }
});

export {router as reactRoute};