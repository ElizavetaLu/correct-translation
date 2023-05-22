import axios from "axios";
import { AuthCredentials, IRequestData, SentencesData } from "../intefaces/intefaces";

const baseURL = 'http://localhost:3030/';
const token = localStorage.getItem('token');

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Authorization'] = token;


export const loginFetch = (payload: AuthCredentials) => {
    return axios.post('login', payload)
}


export const sentencesFetch = ({ pageNumber = 1, sourceLang, targetLang, searchTerm }: IRequestData) => {
    return axios.get(`sentences/?page=${pageNumber}&limit=15&sourceLang=${sourceLang}&targetLang=${targetLang}${searchTerm ? '&keyWords=' + searchTerm : ''}`)
} 

export const setCorrectedSentenceFetch = (payload: SentencesData) => {
    return axios.post('corrected-sentence', payload)
} 

export const setBrandNewSentenceFetch = (payload: SentencesData) => {
    return axios.post('new-sentence', payload)
} 