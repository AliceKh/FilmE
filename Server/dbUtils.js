import {Upload} from "./dbSchemas/dbSchemas";

const { response } = require("express");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
import * as dbSchemas from './dbSchemas/dbSchemas';

function connectToMongo() {
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

async function upload(uploadData) {
  var toUpload = new Upload(uploadData);

  toUpload.save((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
}

module.exports = {
 connectToMongo,
  upload
};