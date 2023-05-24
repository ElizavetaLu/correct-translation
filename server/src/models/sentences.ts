import mongoose, { Document, Model, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';


export interface ISentences extends Document {
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string,
    usersList: string[],
    correct: boolean
};

const sentencesSchema: Schema = new Schema({
    sourceLang: String,
    sourceText: String,
    targetLang: String,
    targetText: String,
    usersList: [String],
    correct: Boolean
});

sentencesSchema.plugin(paginate);

interface SentencesDocument extends mongoose.Document, ISentences { };


export const Sentences = mongoose.model<
    SentencesDocument,
    mongoose.PaginateModel<SentencesDocument>
>('Sentences', sentencesSchema, 'sentences');