import {auth} from "../firebaseUtils.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import express from 'express';
import { insertUser } from "../dbUtils.js";

const router = express.Router();

router.post('/register', (req, res) => {   
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await insertUser(req.body, user.uid);

      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.send(500, error.code);
    });
 });

 router.post('/login', (req, res) => {   
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.send(500, error.code);
    });
 }); 

 export {router as authRoute};