import axios from "axios";
import { AuthCredentials, SentencesData } from "../intefaces/intefaces";

const baseURL = 'http://localhost:3030/';
const token = localStorage.getItem('token');

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Authorization'] = token;


export const loginFetch = (payload: AuthCredentials) => {
    return axios.post('login', payload)
}

export const sentencesFetch = () => {
    return axios.get('sentences')
}

export const setCorrectedSentenceFetch = (payload: SentencesData) => {
    return axios.post('corrected-sentence', payload)
} 