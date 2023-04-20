"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFixedSentences = exports.getSentences = void 0;
const fs = require('fs');
const getSentences = (req, res, next) => {
    fs.readFile(__dirname + '/../../src/data/sentences.json', 'utf8', (error, data) => {
        res.send(data);
    });
};
exports.getSentences = getSentences;
const setFixedSentences = (req, res, next) => {
    const data = req.body;
    const jsonString = JSON.stringify(data);
    fs.writeFile(__dirname + '/../../src/data/fixedSentences.json', jsonString, (err) => {
        if (err) {
            console.log('Error writing file', err);
        }
        else {
            console.log('Successfully wrote file');
            res.send({ saved: "test" });
        }
    });
};
exports.setFixedSentences = setFixedSentences;
