const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {
    const filePath = path.join(basedir, 'info.txt');
    let array = fs.readFileSync(filePath, 'utf8').split('\n');

    let headings = [];
    let texts = [];
    let images = [];

    for (let index = 0; index < array.length; index++) {
        const point = array[index];

        let heading = point.split(' - ')[0];
        let text = point.split(' - ')[1];

        let imagePath = path.join(basedir, 'images', `image ${index + 1}.jpeg`);
        const imgBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

        headings.push(heading);
        texts.push(text);
        images.push(base64Image);
    }

    res.json({headings, texts, images});
});

module.exports = router;