import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const BASE_URL = 'http://localhost:3030';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: (body: { email: string, password: string }) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body
                }
            }
        })
    })
})


export const sentencesApi = createApi({
    reducerPath: 'sentencesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getSentences: builder.query({
            query: () => '/sentences',
        }),
        setFixedSentences: builder.mutation({
            query: (body: any) => {
                return {
                    url: '/fix-data',
                    method: 'POST',
                    body
                }
            }
        })
    }),
})

export const { useLoginMutation } = authApi
export const { useGetSentencesQuery, useSetFixedSentencesMutation } = sentencesApi

