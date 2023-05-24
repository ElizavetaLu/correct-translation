import mongoose, { Model, Schema } from 'mongoose';
import { ISentences } from './sentences';



export interface ICorrectedSentences extends ISentences {
    userId: string,
}


const correctedSentencesSchema: Schema = new Schema({
    sourceLang: String,
    sourceText: String,
    targetLang: String,
    targetText: String,
    correct: Boolean,
    userId: String
});



const CorrectedSentences: Model<ICorrectedSentences> = mongoose.model<ICorrectedSentences>('corrected-sentences', correctedSentencesSchema);

export { CorrectedSentences }; 