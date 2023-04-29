// setx GOOGLE_APPLICATION_CREDENTIALS "D:\Projects\FilmE\emotionrecognition\credentials.json"

const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

app.use(express.json());

app.post('/emotions', async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;
    const [result] = await client.faceDetection(imageUrl);
    const annotations = result.faceAnnotations;
    res.send({annotations})
    // const emotions = annotations.map(annotation => {
    //   return annotation
    // });
    // const emotionType = req.query.emotion;
    // if (emotionType) {
    //   const emotion = emotions[0][emotionType];
    //   res.send({emotion});
    // } else {
    //   res.send({emotions});
    // }
  } catch (error) {
    res.status(400).send({error: error.message});
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});