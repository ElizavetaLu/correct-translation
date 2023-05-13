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
// export type LogoutDispatchType = (args: LogoutActionForAC) => LogoutActionForAC







export interface InputProps {
    type: string,
    name: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    error: string
    resetError: (emptString: string) => void,
}

export interface SentencesData {
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string
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

export interface ILanguageDDInputProps {
    value: string,
    setValue: (val: string) => void
}