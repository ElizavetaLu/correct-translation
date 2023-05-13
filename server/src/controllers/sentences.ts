import { Sentences, CorrectedSentences } from '../models/sentences';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from "../config";


export const getSentences: RequestHandler = async (req, res, next) => {
    const dataToFix = await Sentences.find()
    res.send(dataToFix)
}

export const setCorrectedSentence: RequestHandler = (req, res, next) => {
    const { sourceLang, sourceText, targetLang, targetText } = req.body;
    const token = req.headers.authorization!;

    jwt.verify(token, config.secret, async (err, verifide) => {
        if (!verifide) return res.status(400).json({ error: 'User does not exist' });

        if (err) return res.status(401).json({ error: err });


        const sentences = new CorrectedSentences({
            sourceLang,
            sourceText,
            targetLang,
            targetText,
            userId: verifide.sub,
            correct: true
        });

        sentences.save()
            .then((obj) => res.status(200).send(obj))
            .catch(() => res.status(400).send({ success: false }))
    })
} 