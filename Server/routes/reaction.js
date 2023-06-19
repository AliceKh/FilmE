import express from 'express'
import {createOrUpdateReaction} from "../controllers/reaction.js"
import multer from "multer";
import axios from 'axios';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('', upload.single('photo'), async (req, res) => {
    console.log("got to reacting");
    const {reactionTo, userReacting, timestamp} = req.body;

    console.log(reactionTo, userReacting, timestamp);

    try {
        console.log(req.file);

        let formData = new FormData();
        // const imagelocation = req.path;
        // let type = `image/jpeg`;
        //
        // formData.append('image', req.file, req.file.filename);


        console.log(`./${req.file.path}`);
        try {
            // // const file = await fs.readFileSync(`./${req.file.path}`);
            // // console.log(file);
            //
            // let type = `image/jpeg`;
            // // formData.append('photo', { uri: uri, name: 'filename', type});
            //
            // let fileData = req.file.buffer;
            // // formData.append('image', fileData, req.file.originalname);
            // formData.append('image', {uri: `./${req.file.path}`, name: req.file.filename, type});


            let data = new FormData();
            data.append('image', fs.createReadStream(`./${req.file.path}`));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3001/emotions',
                headers: {
                    ...data.getHeaders()
                },
                data : data
            };

            axios.request(config)
                .then(async (response) => {
                    let reactionData = response;
                    console.log(reactionData);

                    reactionData = {
                        ...reactionData,
                        timestamp: timestamp,
                    };

                    await createOrUpdateReaction(userReacting, reactionTo, reactionData);
                    res.send('reaction saved successfully!');
                })
                .catch((error) => {
                    console.log(error);
                });


            // await axios.post('http://localhost:3001/emotions', formData, {
            //     headers: {'Content-Type': 'multipart/form-data'}
            // }).then(async res => {
            //     let reactionData = res;
            //     console.log(reactionData);
            //
            //     reactionData = {
            //         ...reactionData,
            //         timestamp: timestamp,
            //     };
            //
            //     await createOrUpdateReaction(userReacting, reactionTo, reactionData);
            //     res.send('reaction saved successfully!');
            // }).catch(err => {
            //     console.log(err);
            // });

        } catch (error) {
            // Handle the error appropriately
            console.error(error);
        }

    } catch (e) {
        console.log(e);
        res.send('reaction save failed');
    }
});

export {router as reactRoute};