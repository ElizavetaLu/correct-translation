"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCorrectedSentence = exports.getSentences = void 0;
const sentences_1 = require("../models/sentences");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getSentences = async (req, res, next) => {
    const dataToFix = await sentences_1.Sentences.find();
    res.send(dataToFix);
};
exports.getSentences = getSentences;
const setCorrectedSentence = (req, res, next) => {
    const { sourceLang, sourceText, targetLang, targetText } = req.body;
    const token = req.headers.authorization;
    jsonwebtoken_1.default.verify(token, config_1.default.secret, async (err, verifide) => {
        if (!verifide)
            return res.status(400).json({ error: 'User does not exist' });
        if (err)
            return res.status(401).json({ error: err });
        const sentences = new sentences_1.CorrectedSentences({
            sourceLang,
            sourceText,
            targetLang,
            targetText,
            userId: verifide.sub,
            correct: true
        });
        sentences.save()
            .then((obj) => res.status(200).send(obj))
            .catch(() => res.status(400).send({ success: false }));
    });
};
exports.setCorrectedSentence = setCorrectedSentence;
