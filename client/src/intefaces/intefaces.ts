//Authentication interfaces

export interface AuthState {
    token: string | null,
    email: string | null,
    errorMessage: string,
}

export interface AuthActionForReducer {
    type: string,
    payload: string
}

export interface AuthCredentials {
    email: string,
    password: string
}

export interface AuthActionForAC {
    type: string,
    payload: AuthCredentials | string
}

export interface LogoutActionForAC {
    type: string,
    payload: string
}

export type AuthDispatchType = (args: AuthActionForAC) => AuthActionForAC




//Sentences data interfaces

export interface SentencesData {
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string
};

export interface ISentencesDataWithId extends SentencesData {
    id: string, 
};
export interface ReceivedSentencesData extends SentencesData {
    _id: string,
    corrected: boolean
};

export interface ILanguage {
    name: string,
    code: string,
    flag: string
};

export interface ILanguages {
    sourceLang: string,
    targetLang: string
}

export interface IRequestData {
    pageNumber: number,
    sourceLang: string,
    targetLang: string
    searchTerm?: string,
}



//components props
export interface ILanguageDDInputProps {
    value: ILanguage,
    setValue: (lang: ILanguage) => void;
    action: (lang: ILanguage) => void;
}

export interface ILanguageTinyDDInputProps {
    value: string,
    setValue: (lang: string) => void;
}

export interface IPopup {
    isShown: boolean,
    message: string,
    toggle: () => void
}

export interface IInputWithLabel {
    type: string,
    name: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    error: string
    resetError: (emptString: string) => void,
}

export interface IInput {
    value: string,
    setValue: (val: string) => void
}


export interface ITableRowDefault {
    sourceText: string,
    targetText: string,
    id: string
}

export interface ICross {
    action?: any,
    primary?: boolean,
    defaultWhite?: boolean,
    error?: boolean
}

export interface ISelectLanguage {
    setSourceLanguage: (lang: ILanguage) => void,
    setTargetLanguage: (lang: ILanguage) => void,
    sourceLang: ILanguage,
    targetLang: ILanguage
}


//sentences state:
export interface ISentencesState {
    isLoading: boolean,
    totalPages: number,
    pageNumber: number,
    searchTerm: string,
    sourceLang: ILanguage,
    targetLang: ILanguage,
    sentences: ReceivedSentencesData[],
    activeItemId: null | string,
}