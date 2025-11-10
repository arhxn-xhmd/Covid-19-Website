const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {
    const folders = fs.readdirSync(basedir).filter(f => fs.statSync(path.join(basedir, f)).isDirectory());

    if (folders.length === 0) {
        return res.status(404).json({ error: 'No doctor folders found' });
    }

    const randomFolder = folders[Math.floor(Math.random() * folders.length)];
    const textPath = path.join(basedir, randomFolder, 'info.txt');
    const imagePath = path.join(basedir, randomFolder, 'image.jpeg');

    if (!fs.existsSync(textPath) || !fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Doctor info missing' });
    }

    const text = fs.readFileSync(textPath, 'utf8').trim();
    const imgBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;

    res.json({ text, image: base64Image });
});

module.exports = router;
