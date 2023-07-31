import * as reactionStatistics from "../controllers/db/reactionStatistics.js";
import express from "express";

const router = express.Router();

router.get('/:objectId', async (req, res) => {
    const { objectId } = req.params;

    try {
        const item = await reactionStatistics.getItemById(objectId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.json(item);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export {router as reactionsAnalytics};