import { Sentences, CorrectedSentences } from '../models/sentences';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from "../config";


export const getSentences: RequestHandler = async (req, res, next) => {

    const { page, limit, sourceLang, targetLang, keyWords } = req.query;

    const options = {
        page,
        limit
    };

    const query = {
        sourceLang,
        targetLang,
        sourceText: { $regex: keyWords ? keyWords : '', $options: 'i' }
    };


    Sentences.paginate(query, options, (error: Error, result: any) => {

        if (error) return res.status(422).json({ error });

        res.status(200).send(result)
    });
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
            .then(() => res.status(200).send({ result: 'Changes were successfully saved' }))
            .catch(() => res.status(400).send({ error: 'Bad request' }))
    })
}


export const setBrandNewSentence: RequestHandler = (req, res, next) => {
    const { sourceLang, sourceText, targetLang, targetText } = req.body;
    const token = req.headers.authorization!;

    jwt.verify(token, config.secret, async (err, verifide) => {
        if (!verifide) return res.status(400).json({ error: 'User does not exist' });

        if (err) return res.status(401).json({ error: err });


        const sentences = new Sentences({
            sourceLang,
            sourceText,
            targetLang,
            targetText,
            correct: false
        });

        sentences.save()
            .then(() => res.status(200).send({ result: 'New sentence was created' }))
            .catch(() => res.status(400).send({ error: 'Bad request' }))
    })
} 