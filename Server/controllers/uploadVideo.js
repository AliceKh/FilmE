import {firebaseInstance, videoDirectoryPath, bucketName} from "../firebaseUtils.js";
import Multer from 'multer';
import FirebaseStorage from 'multer-firebase-storage';

// const videoFilter = (req, file, callback) => {
//     // Accept video files only
//     if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
//         return callback(new Error('Only video files are allowed!'), false);
//     }
//     callback(null, true);
// };

export const uploadVideoMulter = Multer({
    storage: FirebaseStorage({
        bucketName: bucketName,
        // credential: credentials,
        directoryPath: videoDirectoryPath,
        unique: 'true',
        hooks: {
            beforeInit(storageInstance) { // called before the Firebase Storage instance is initialized
                console.log(`before init:`, storageInstance)
            },
            afterInit(storageInstance, firebaseInstance) { // called after the Firebase Storage instance is initialized
                console.log(`after init:`, storageInstance, firebaseInstance)
            },
            beforeUpload(req, file) { // called before the file is uploaded to Firebase Storage
                console.log(`before upload:`, req, file)
            },
            afterUpload(req, file, fileRef, bucketRef) { // called after the file is uploaded to Firebase Storage
                console.log(`after upload:`, req, file, fileRef, bucketRef)
            },
            beforeRemove(req, file) { // called before the file is deleted from Firebase Storage
                console.log(`before remove:`, req, file)
            },
            afterRemove(req, file, fref, bref) { // called after the file is deleted from Firebase Storage
                console.log(`after remove:`, req, file, fref, bref)
            }
        }
    }, firebaseInstance)
})

// export function uploadVideo(file) {
//     if (videoFilter(file))
//         uploadBytes(videoRef, file).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//         });
// }

