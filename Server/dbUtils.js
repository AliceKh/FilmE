import Upload from "./dbSchemas/upload.js";
import dotenv from 'dotenv'
import { response } from "express";
import mongoose from "mongoose";
import User from './dbSchemas/user.js';
//var ObjectId = require("mongoose").Types.ObjectId;
//import * as dbSchemas from './dbSchemas/dbSchemas';

dotenv.config();

export function connectToMongo() {
  console.log("DATABASE_URL: ", process.env.DATABASE_URL);
  mongoose.connect(
        process.env.DATABASE_URL,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("mongodb connection open!");
    })
    .catch((err) => {
      console.log("error connecting to mongodb");
    });
}

export async function upload(uploadData) {
  var toUpload = new Upload(uploadData);

  toUpload.save((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}

export async function insertUser(userData, uid) {
  var user = new User({Email:userData.email, Username:userData.username, UID:uid});

  user.save((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}
