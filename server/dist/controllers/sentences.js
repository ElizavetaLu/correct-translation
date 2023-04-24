"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFixedSentence = exports.getSentences = void 0;
const uuid_1 = require("uuid");
const fs = require('fs');
const getSentences = (req, res, next) => {
    fs.readFile(__dirname + '/../../src/data/sentences.json', 'utf8', (err, data) => {
        if (err)
            return res.json({ error: 'Error file read.' });
        res.send(data);
    });
};
exports.getSentences = getSentences;
const setFixedSentence = (req, res, next) => {
    const data = req.body;
    if (!data)
        return res.status(400).send({ error: 'No data was provided' });
    const fixedSentence = { _id: (0, uuid_1.v4)(), ...data };
    fs.readFile(__dirname + '/../../src/data/fixedSentences.json', 'utf8', (err, data) => {
        if (err)
            return res.json({ error: 'Error file read.' });
        const sentencesArray = JSON.parse(data);
        sentencesArray.push(fixedSentence);
        const sentencesToString = JSON.stringify(sentencesArray);
        fs.writeFile(__dirname + '/../../src/data/fixedSentences.json', sentencesToString, (err) => {
            if (err)
                return res.json({ error: 'Error writing file' });
            res.status(200).send({ success: true });
        });
    });
};
exports.setFixedSentence = setFixedSentence;
