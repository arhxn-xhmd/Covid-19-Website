const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const basedir = __dirname;

router.get('/', (req, res) => {

    const questionsFile = path.join(basedir, 'questions.txt');
    console.log(questionsFile)
    const yesAnswersFile = path.join(basedir, 'yes_answers.txt');
    const noAnswersFile = path.join(basedir, 'no_answers.txt');

    let questions = fs.readFileSync(questionsFile, 'utf8').split('\n');
    let yesAnswers = fs.readFileSync(yesAnswersFile, 'utf8').split('\n');
    let noAnswers = fs.readFileSync(noAnswersFile, 'utf8').split('\n');

    let randomNum = Math.floor(Math.random() * questions.length);
    let question = questions[randomNum];
    let yesAnswer = yesAnswers[randomNum];
    let noAnswer = noAnswers[randomNum];

    res.json({question, yesAnswer, noAnswer})
})

module.exports = router;