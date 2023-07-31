import Upload from "../../dbSchemas/upload.js";
import { generateProfileImage } from "../../dbUtils.js";

export async function insertUpload(uploadData) {
    if(uploadData['LinkToPreviewImage'] == ""){
        uploadData['LinkToPreviewImage'] = await generateProfileImage('Identify');
    }
    var toUpload = new Upload(uploadData);
    toUpload.save((err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}