import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');


export const getSentences: RequestHandler = (req, res, next) => {

    fs.readFile(__dirname + '/../../src/data/sentences.json', 'utf8', (err: Error, data: any) => {
        if (err) return res.json({ error: 'Error file read.' });
        res.send(data)
    });
}

export const setFixedSentence: RequestHandler = (req, res, next) => {
    const data = req.body;

    if (!data) return res.status(400).send({ error: 'No data was provided' });

    const fixedSentence = { _id: uuidv4(), ...data }

    fs.readFile(__dirname + '/../../src/data/fixedSentences.json', 'utf8', (err: Error, data: any) => {
        if (err) return res.json({ error: 'Error file read.' });

        const sentencesArray = JSON.parse(data);
        sentencesArray.push(fixedSentence);

        const sentencesToString = JSON.stringify(sentencesArray);

        fs.writeFile(__dirname + '/../../src/data/fixedSentences.json', sentencesToString, (err: Error) => {
            if (err) return res.json({ error: 'Error writing file' });

            res.status(200).send({ success: true });
        })
    });
}