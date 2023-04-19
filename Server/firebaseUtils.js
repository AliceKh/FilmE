import serviceAccount from './firebase/serviceAccountKey.json' assert {type: 'json'};
import admin from 'firebase-admin';

export const bucketName = "filme-4277e.appspot.com";
export const credentials = serviceAccount;
export const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), storageBucket: "filme-4277e.appspot.com"
});

export const videoDirectoryPath = 'video'
export const audioDirectoryPath = 'audio'
export const previewImagesDirectoryPath = 'preview'
export const profileImagesDirectoryPath = 'profile images'