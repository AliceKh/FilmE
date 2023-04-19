import Multer from 'multer';
import {multerByType} from "./uploadUtils.js";
import {previewImagesDirectoryPath} from "../../firebaseUtils.js";

export const uploadPreviewMulter = Multer(multerByType('image', previewImagesDirectoryPath))