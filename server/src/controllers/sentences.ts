import { CorrectedSentences } from '../models/correctedSentences';
import { Sentences } from '../models/sentences';
import { RequestHandler } from 'express';


export const getSentences: RequestHandler = async (req, res, next) => {

    const { page, limit, sourceLang, targetLang, keyWords } = req.query;
    const userId = req.user;


    const options = {
        page: typeof page === 'string' ? parseInt(page) : 1,
        limit: typeof limit === 'string' ? parseInt(limit) : 15
    };

    const query = {
        sourceLang,
        targetLang,
        sourceText: { $regex: keyWords ? keyWords : '', $options: 'i' },
        usersList: { $nin: userId }
    };

    Sentences.paginate(query, options, (error: Error, result: any) => {

        if (error) return res.status(422).json({ error });

        res.status(200).send(result)
    });
}

export const setCorrectedSentence: RequestHandler = (req, res, next) => {

    const { sourceLang, sourceText, targetLang, targetText, id } = req.body;
    const userId = req.user;

    Sentences.updateOne({ _id: id }, { $addToSet: { usersList: userId } })
        .then(() => { })
        .catch(() => { })

    const sentences = new CorrectedSentences({
        sourceLang,
        sourceText,
        targetLang,
        targetText,
        userId,
        correct: true
    });

    sentences.save()
        .then(() => res.status(200).send({ result: 'Changes were successfully saved' }))
        .catch(() => res.status(400).send({ error: 'Bad request' }))
}


export const setBrandNewSentence: RequestHandler = (req, res, next) => {

    const { sourceLang, sourceText, targetLang, targetText } = req.body;
    const userId = req.user;

    const sentences = new Sentences({
        sourceLang,
        sourceText,
        targetLang,
        targetText,
        usersList: [userId],
        correct: false
    });

    sentences.save()
        .then(() => res.status(200).send({ result: 'New sentence was created' }))
        .catch(() => res.status(400).send({ error: 'Bad request' }))
}