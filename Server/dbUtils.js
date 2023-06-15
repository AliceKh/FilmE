import Upload from "./dbSchemas/upload.js";
import dotenv from 'dotenv'
import { response } from "express";
import mongoose from "mongoose";
import User from './dbSchemas/user.js';
import { createCanvas } from "canvas";
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

export async function insertUpload(uploadData) {
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
  var profileImage = await generateProfileImage(userData.username);

  var user = new User({Email:userData.email,
                       Username:userData.username,
                       UID:uid, 
                       ProfileImage: profileImage});

  user.save((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

  async function generateProfileImage(username) {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    const colors = ['#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#FF0000', '#B22222', '#8B0000', '#FF6347', '#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#DAA520', '#ADFF2F', '#7FFF00', '#00FF7F', '#32CD32', '#00FA9A', '#00FF00', '#90EE90', '#00BFFF', '#1E90FF', '#4169E1', '#0000FF', '#00008B', '#4B0082', '#9400D3', '#8A2BE2', '#FF00FF', '#FF69B4', '#FFC0CB', '#FFB6C1', '#DB7093', '#C71585', '#FF1493'];
    const color = colors[Math.floor(Math.random() * colors.length)];
  
    // Set background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Load the user's initials as text
    const initials = username.slice(0, 2).toUpperCase();
    ctx.font = '60px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2 + 20);
  
    // Convert canvas to a data URL
    const dataUrl = canvas.toDataURL();
  
    // Return the data URL
    return dataUrl;
  }
}
