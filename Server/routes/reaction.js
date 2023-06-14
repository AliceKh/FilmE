import express from 'express'
import Reaction from "../dbSchemas/reaction.js";
import multer from "multer";
import upload from "../dbSchemas/upload.js";
import * as reactionStatistics from "../controllers/db/reactionStatistics.js";

const router = express.Router();
const react = multer({ dest: 'faceRecognition/' });
// router.post('/upload', upload.single('photo'), async (req, res) => {
//     try {
//         // Read the file from the temporary location
//         const photo = req.file;
//         const userReactingId = req.body.userReactingId;
//         const uploadId = req.body.uploadId;
//
//         // Send the photo to another route using axios
//         const response = await axios.post('http://localhost:3000/process', {
//             photo: {
//                 data: photo.buffer,
//                 contentType: photo.mimetype,
//                 filename: photo.originalname
//             },
//             userReactingId,
//             uploadId
//         });
//
//         // Save the reaction to the database
//         const reaction = new Reaction({
//             UserReacting: userId,
//             ReactingTo: uploadId,
//             ReactionMetadata: [{ ...response.data }]
//         });
//         await reaction.save();
//
//         // Handle the response from the other route
//         // For example, you can send a success message back to the client
//         res.json({ message: 'Photo sent and reaction saved successfully' });
//     } catch (error) {
//         // Handle any errors that occur during the process
//         res.status(500).json({ error: 'An error occurred' });
//     }
// }); // upload??

export {router as reactRoute};