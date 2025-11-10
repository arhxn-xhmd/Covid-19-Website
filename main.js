const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// serve frontend files (HTML, CSS, JS)
app.use(express.static('public'));

// middleware to parse JSON format
app.use(express.json());

// import the doctor router
const meetDoctor = require(path.join(__dirname, 'meet doctors', 'doctors.js'));
app.use('/meet-doctor', meetDoctor);

// import the sick router   
const sickApi = require(path.join(__dirname, 'sick info', 'sick.js'));
app.use('/are-you-sick', sickApi);

// import the contagion corona virus router
const contagion = require(path.join(__dirname, 'contagion virus', 'contagion.js'));
app.use('/contagion-corona', contagion);

// import the symptoms router 
const symptom = require(path.join(__dirname, 'symptoms', 'symptom.js'));
app.use('/symptoms', symptom);

// import the prevention router
const prevention = require(path.join(__dirname, 'prevention', 'prevention.js'));
app.use('/prevention', prevention);

// import the best doctor router 
const bestDoctor = require(path.join(__dirname, 'doctors', 'doctors.js'));
app.use('/best-doctors', bestDoctor);

// import the steps router
const steps = require(path.join(__dirname, 'steps', 'steps.js'));
app.use('/steps', steps);

// import the blogs router
const blogs = require(path.join(__dirname, 'blogs', 'blogs.js'));
app.use('/blogs', blogs); 

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
