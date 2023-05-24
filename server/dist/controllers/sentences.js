"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBrandNewSentence = exports.setCorrectedSentence = exports.getSentences = void 0;
const correctedSentences_1 = require("../models/correctedSentences");
const sentences_1 = require("../models/sentences");
const getSentences = async (req, res, next) => {
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
    sentences_1.Sentences.paginate(query, options, (error, result) => {
        if (error)
            return res.status(422).json({ error });
        res.status(200).send(result);
    });
};
exports.getSentences = getSentences;
const setCorrectedSentence = (req, res, next) => {
    const { sourceLang, sourceText, targetLang, targetText, id } = req.body;
    const userId = req.user;
    sentences_1.Sentences.updateOne({ _id: id }, { $addToSet: { usersList: userId } })
        .then(() => { })
        .catch(() => { });
    const sentences = new correctedSentences_1.CorrectedSentences({
        sourceLang,
        sourceText,
        targetLang,
        targetText,
        userId,
        correct: true
    });
    sentences.save()
        .then(() => res.status(200).send({ result: 'Changes were successfully saved' }))
        .catch(() => res.status(400).send({ error: 'Bad request' }));
};
exports.setCorrectedSentence = setCorrectedSentence;
const setBrandNewSentence = (req, res, next) => {
    const { sourceLang, sourceText, targetLang, targetText } = req.body;
    const userId = req.user;
    const sentences = new sentences_1.Sentences({
        sourceLang,
        sourceText,
        targetLang,
        targetText,
        usersList: [userId],
        correct: false
    });
    sentences.save()
        .then(() => res.status(200).send({ result: 'New sentence was created' }))
        .catch(() => res.status(400).send({ error: 'Bad request' }));
};
exports.setBrandNewSentence = setBrandNewSentence;
