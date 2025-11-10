const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.post('/', (req, res) => {
    let folder = req.body.purpose;

    let descriptionFile = path.join(basedir, folder, 'description.txt');
    let description = fs.readFileSync(descriptionFile, 'utf8');

    let stepsFile = path.join(basedir, folder, 'step.txt');
    let stepsArray = fs.readFileSync(stepsFile, 'utf8').split('\n');

    let steps = [];
    let images = [];

    for (let index = 0; index < 12; index++) {
        const step = stepsArray[index];

        let imagePath = path.join(basedir, folder, 'images', `image ${index + 1}.jpeg`);
        const imgBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

        steps.push(step);
        images.push(base64Image);
    };

    res.json({description, steps, images});
});

module.exports = router;