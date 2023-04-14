import Multer from 'multer';
import {multerByType} from "./uploadUtils.js";
import {previewImagesDirectoryPath, profileImagesDirectoryPath} from "../../firebaseUtils.js";

export const uploadProfileImageMulter = Multer(multerByType('image', profileImagesDirectoryPath))