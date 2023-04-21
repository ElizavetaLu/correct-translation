export interface InputProps {
    type: string,
    name: string,
    label: string,
    value: string,
    onChange: Function
}


export interface SentencesData {
    _id: number,
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string
};

export interface InfoBlockProps {
    message: string
}