import express from 'express'
import Upload from '../dbSchemas/upload.js'
import User from '../dbSchemas/user.js';
import {auth} from '../firebaseUtils.js'

const router = express.Router();


router.get('/exploreuploads', async (req, res) => {
    try{
        const currentUser = auth.currentUser.email;
        const user = await User.findOne({ Email : currentUser});
        const uploads = await Upload.find({Uploader: {$ne : user._id}}).populate({ path: 'Uploader', model: 'Users' })
        res.json(uploads);
        } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error retrieving uploads' });
        };
})

export {router as getExploreUploads};