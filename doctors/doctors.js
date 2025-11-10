const express = require('express');
const fs = require('fs');
const path = require('path');
const { route } = require('../symptoms/symptom');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {

    let objArr = []

    for (let index = 0; index < 3; index++) {
        let doctorsFile = path.join(basedir, `doctor ${index + 1}`, 'info.txt');
        let array = fs.readFileSync(doctorsFile, 'utf8').split('\n');

        let doctorImgFile = path.join(basedir, `doctor ${index + 1}`, 'image.jpeg');
        const imgBuffer = fs.readFileSync(doctorImgFile);
        const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`; 

        let obj = {
            name: array[0],
            occupation: array[1],
            description: array[2],
            phone: array[3],
            email: array[4],
            image: base64Image,
        };

        objArr.push(obj);
    }
    
    res.json({objArr});
});

router.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let date = req.body.date;

    let appointmentConfirmation = `---------------------------------------------
           APPOINTMENT CONFIRMATION
---------------------------------------------

Patient Name: ${name}
Email Address: ${email}
Phone Number: +91 ${number}
Appointment Date: ${date}

Dear ${name},

Your appointment has been successfully booked for ${date}.
Please arrive 10–15 minutes early for registration and verification.

You can show this file at the hospital reception as proof of your appointment.

Thank you for choosing our healthcare services.
We look forward to serving you with care and dedication.

---------------------------------------------
           HEALTHCARE APPOINTMENT DESK
---------------------------------------------`

    fs.writeFileSync('doctors/appointment confirmation.txt', appointmentConfirmation);
    res.json({ file: 'appointment confirmation.txt' });
});

router.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, req.params.filename);
    res.download(filePath);
})

module.exports = router;