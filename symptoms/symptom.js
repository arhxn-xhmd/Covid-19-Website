const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {
    let headings = [];
    let texts = [];
    let images = [];

    for (let index = 0; index < 6; index++) {
        let filePath = path.join(basedir, `symptom ${index + 1}`, 'info.txt');
        let array = fs.readFileSync(filePath, 'utf8').split('\n');

        const point = array[0];
        const heading = point.split(' - ')[0];
        const text = point.split(' - ')[1];

        let imagePath = path.join(basedir, `symptom ${index + 1}`, `image.jpeg`);
        const imgBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

        headings.push(heading);
        texts.push(text);
        images.push(base64Image);
    };

    res.json({headings, texts, images});
});

module.exports = router;