import {initializeApp} from "firebase/app";
import {getStorage, ref} from "firebase/storage";
import serviceAccount from './firebase/serviceAccountKey.json' assert {type: 'json'};
import admin from 'firebase-admin';

// const firebaseConfig = {
//     apiKey: "AIzaSyAg90KoiFNjyWEq8v3TsS_DtdIXI0yaj1Y",
//     authDomain: "filme-4277e.firebaseapp.com",
//     projectId: "filme-4277e",
//     storageBucket: "filme-4277e.appspot.com",
//     messagingSenderId: "89922647715",
//     appId: "1:89922647715:web:a9d3c299d65f9bafa8f116",
//     measurementId: "G-YG8BEYHXJW",
//     credential: admin.credential.cert(serviceAccount)
// };

export const bucketName = "filme-4277e.appspot.com";
export const credentials = serviceAccount;
export const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "filme-4277e.appspot.com"
});
// export const firebaseInstance = initializeApp(firebaseConfig);
// Create a root reference
// export const firebaseStorage = getStorage(firebaseInstance);

export const videoDirectoryPath = 'video/'
export const audioDirectoryPath = 'audio/'
export const previewImagesDirectoryPath = 'preview/'
export const profileImagesDirectoryPath = 'profile images/'

// Create a reference to each folder
// export const videoRef = ref(firebaseInstance, videoDirectoryPath);
// export const audioRef = ref(firebaseInstance, audioDirectoryPath);
// export const previewRef = ref(firebaseInstance, previewImagesDirectoryPath);
// export const profile_imagesRef = ref(firebaseInstance, profileImagesDirectoryPath);
