//Authentication interfaces
export interface AuthState {
    token: string | null,
    errorMessage: string,
    email: string,
    qrCode: string
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
    onChange: Function
}

export interface SentencesData {
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    targetText: string
};

export interface ILanguage {
    name: string,
    code: string,
    flag: string
};