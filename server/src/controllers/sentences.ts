import { RequestHandler } from 'express';
const fs = require('fs');



export const getSentences: RequestHandler = (req, res, next) => {
    fs.readFile(__dirname + '/../../src/data/sentences.json', 'utf8', (error: Error, data: any) => {
        res.send(data)
    });
}

export const setFixedSentences: RequestHandler = (req, res, next) => {
    const data = req.body

    const jsonString = JSON.stringify(data)

    fs.writeFile(__dirname + '/../../src/data/fixedSentences.json', jsonString, (err: Error) => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
            res.send({ saved: "test" })
        }
    })
}