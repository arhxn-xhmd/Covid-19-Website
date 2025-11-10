const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {

    let headings = [];
    let dates = [];
    let authors = [];
    let descriptions = [];
    let images = [];

    for (let index = 0; index < 3; index++) {
        let filePath = path.join(basedir, `blog ${index + 1}`, 'info.txt');
        let array = fs.readFileSync(filePath, 'utf8').split('\n');

        const heading = array[0];
        const date = array[1];
        const author = array[2];
        const description = array[3];

        let imagePath = path.join(basedir, `blog ${index + 1}`, `image.jpeg`);
        const imgBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

        headings.push(heading);
        dates.push(date);
        authors.push(author);
        descriptions.push(description);
        images.push(base64Image);
    };

    res.json({headings, dates, authors, descriptions, images});
});

module.exports = router;