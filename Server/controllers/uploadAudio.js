// import {uploadBytes} from "firebase/storage";
// import {audioRef, firebaseInstance, videoRef} from "../firebaseUtils.js";
// import fs from 'fs';
// import Multer from 'multer'
// import FirebaseStorage from 'multer-firebase-storage'
//
// const videoFilter = (req, file, cb) => {
//     // Accept video files only
//     if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
//         return cb(new Error('Only video files are allowed!'), false);
//     }
//     cb(null, true);
// };
//
// const audioFilter = (req, file, cb) => {
//     // Accept audio files only
//     if (!file.originalname.match(/\.(mp3|wav|ogg)$/)) {
//         return cb(new Error('Only audio files are allowed!'), false);
//     }
//     cb(null, true);
// };
//
// const checkFileSize = async (filePath) => {
//     const stats = fs.statSync(filePath);
//     const fileSizeInBytes = stats.size;
//     console.log(`Video file size: ${fileSizeInBytes} bytes`);
//     return fileSizeInBytes;
// }
//
// const multer = Multer({
//     storage:
//         FirebaseStorage({
//             hooks: {
//                 beforeInit(instance) {
//                     console.log(`before init:`, instance)
//                 },
//                 afterInit(instance, fb) {
//                     console.log(`after init:`, instance, fb)
//                 },
//                 beforeUpload(req, file) {
//                     console.log(`before upload:`, req, file)
//                 },
//                 afterUpload(req, file, fref, bref) {
//                     console.log(`after upload:`, req, file, fref, bref)
//                 },
//                 beforeRemove(req, file) {
//                     console.log(`before remove:`, req, file)
//                 },
//                 afterRemove(req, file, fref, bref) {
//                     console.log(`after remove:`, req, file, fref, bref)
//                 }
//             }
//         }, firebaseInstance)
// })
//
// export function uploadVideo(file) {
//     if (videoFilter(file))
//         uploadBytes(videoRef, file).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//         });
// }
//
// export function uploadAudio(file) {
//     uploadBytes(audioRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
// }