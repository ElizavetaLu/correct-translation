import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISentences extends Document {
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string,
    correct: boolean
}

export interface ICorrectedSentences extends ISentences {
    userId: string,
}


const sentencesSchema: Schema = new Schema({
    sourceLang: String,
    sourceText: String,
    targetLang: String,
    targetText: String,
    correct: Boolean
});

const correctedSentencesSchema: Schema = new Schema({
    sourceLang: String,
    sourceText: String,
    targetLang: String,
    targetText: String,
    correct: Boolean,
    userId: String
});



const Sentences: Model<ISentences> = mongoose.model<ISentences>('sentences', sentencesSchema);
const CorrectedSentences: Model<ICorrectedSentences> = mongoose.model<ICorrectedSentences>('corrected-sentences', correctedSentencesSchema);

export { Sentences, CorrectedSentences };