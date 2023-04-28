import {auth} from "../firebaseUtils.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import express from 'express';
import { insertUser } from "../dbUtils.js";

const router = express.Router();

router.post('/register', (req, res) => {   
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.UserImpl, user.uid);
      await insertUser(req.body, user.uid);

      res.sendStatus(200);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      res.sendStatus(500);
    });
 });

 router.post('/login', (req, res) => {   
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.sendStatus(200);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      res.sendStatus(500);
    });
 }); 

 export {router as authRoute};