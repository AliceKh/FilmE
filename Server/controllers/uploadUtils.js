import fs from "fs";

export const checkFileSize = async (filePath) => {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    console.log(`Video file size: ${fileSizeInBytes} bytes`);
    return fileSizeInBytes;
}