import fs from "fs";
import FirebaseStorage from "multer-firebase-storage";
import {bucketName, firebaseInstance} from "../../firebaseUtils.js";

export const checkFileSize = async (filePath) => {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    console.log(`Video file size: ${fileSizeInBytes} bytes`); // TODO console.log
    return fileSizeInBytes;
}

export const filetypeFilter = {
    video: /\.(mp4|avi|mkv|mov)$/,
    audio: /\.(mp3|wav|ogg)$/,
    image: /\.(png|jpg|jpeg)$/
}

export function filterBytype(type) {
    return (req, file, callback) => {
        if (!file.originalname.match(filetypeFilter[type])) {
            return callback(new Error('Only ' + type + ' files are allowed!'), false);
        }
        callback(null, true);
    }
}

export function multerByType(type, dir) {
    return {
        // fileFilter: filterBytype(type),
        storage: FirebaseStorage({
            bucketName: bucketName,
            directoryPath: dir,
            unique: 'true',
            hooks: {
                // beforeInit(storageInstance) { // called before the Firebase Storage instance is initialized
                //     console.log(`before init:`, storageInstance)
                // },
                // afterInit(storageInstance, firebaseInstance) { // called after the Firebase Storage instance is initialized
                //     console.log(`after init:`, storageInstance, firebaseInstance)
                // },
                // beforeUpload(req, file) { // called before the file is uploaded to Firebase Storage
                //     console.log(`before upload:`, req, file)
                // },
                // afterUpload(req, file, fileRef, bucketRef) { // called after the file is uploaded to Firebase Storage
                //     console.log(`after upload:`, req, file, fileRef, bucketRef)
                // },
                // beforeRemove(req, file) { // called before the file is deleted from Firebase Storage
                //     console.log(`before remove:`, req, file)
                // },
                // afterRemove(req, file, fref, bref) { // called after the file is deleted from Firebase Storage
                //     console.log(`after remove:`, req, file, fref, bref)
                // }
            }
        }, firebaseInstance)
    }
}