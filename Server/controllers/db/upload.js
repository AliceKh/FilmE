import Upload from "../../dbSchemas/upload.js";

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