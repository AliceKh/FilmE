import serviceAccount from './firebase/serviceAccountKey.json' assert {type: 'json'};
import admin from 'firebase-admin';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const bucketName = "filme-4277e.appspot.com";
export const credentials = serviceAccount;
export const firebaseInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), storageBucket: "filme-4277e.appspot.com"
});

export const videoDirectoryPath = 'video'
export const audioDirectoryPath = 'audio'
export const previewImagesDirectoryPath = 'preview'
export const profileImagesDirectoryPath = 'profile images'

var firebaseConfig = {
    apiKey: "AIzaSyAg90KoiFNjyWEq8v3TsS_DtdIXI0yaj1Y",
    authDomain: "filme-4277e.firebaseapp.com",
    projectId: "filme-4277e",
    storageBucket: "filme-4277e.appspot.com",
    messagingSenderId: "89922647715",
    appId: "1:89922647715:web:a9d3c299d65f9bafa8f116",
    measurementId: "G-YG8BEYHXJW"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);