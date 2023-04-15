import Multer from 'multer';
import {multerByType} from "./uploadUtils.js";
import {videoDirectoryPath} from "../../firebaseUtils.js";

export const uploadVideoMulter = Multer(multerByType('video',videoDirectoryPath))