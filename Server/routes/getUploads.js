import express from 'express'
import Upload from '../dbSchemas/upload.js'

const router = express.Router();


router.get('/uploads', async (req, res) => {
    try{
        const uploads = await Upload.find().populate({ path: 'Uploader', model: 'Users' })
        res.json(uploads);
        } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error retrieving uploads' });
        };
})

export {router as getUploads};