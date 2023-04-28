import Multer from 'multer';
import {multerByType} from "./uploadUtils.js";
import {audioDirectoryPath} from "../../firebaseUtils.js";

export const uploadAudioMulter = Multer(multerByType('audio', audioDirectoryPath))