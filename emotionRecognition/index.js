// setx GOOGLE_APPLICATION_CREDENTIALS "D:\Projects\FilmE\emotionrecognition\credentials.json"
const express = require('express');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const client = new ImageAnnotatorClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`; // Generate a unique filename
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage });

// Function to process image link
const processImageLink = async (imageUrl) => {
  const [result] = await client.faceDetection(imageUrl);
  const annotations = result.faceAnnotations;
  return annotations;
};

// Function to process base64 encoded image
const processBase64Image = async (imageBase64) => {
  const imageBuffer = Buffer.from(imageBase64, 'base64');
  const imageUrl = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  return await processImageLink(imageUrl);
};

// Function to process image file
const processImageFile = async (imageFile) => {
  const imageUrl = `./uploads/${imageFile.filename}`;
  console.log(imageUrl);
  return await processImageLink(imageUrl);
};

app.post('/emotions', upload.single('image'), async (req, res) => {
  try {
    if (req.body.imageUrl) {
      const annotations = await processImageLink(req.body.imageUrl);
      res.send({ annotations });
    } else if (req.body.imageBase64) {
      const annotations = await processBase64Image(req.body.imageBase64);
      res.send({ annotations });
    } else if (req.file) {
      const annotations = await processImageFile(req.file);
      res.send({ annotations });
    } else {
      throw new Error('No image specified');
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
