import { SyntheticEvent, useEffect } from "react";
import TbodyTr from "../components/table/TbodyTr";
import { useGetSentencesQuery, useSetFixedSentencesMutation } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSentences } from "../features/slices/sentencesSlice";


const Home = () => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.sentences);
    // const state = useAppSelector(state => state.sentences);


    const { data, isLoading, error } = useGetSentencesQuery('');


    useEffect(() => {
        if (!isLoading) dispatch(setSentences(data))
    }, [isLoading])



    const [setFixedSentences, { data: fixedData, isSuccess, isError }] = useSetFixedSentencesMutation()

    const testFetch = async (e: SyntheticEvent) => {
        console.log('start')
        await setFixedSentences(state.fixedData)
        console.log(isSuccess)
        console.log(isError)
    }

    useEffect(() => {
        console.log(fixedData)
        console.log(isSuccess)
        console.log(isError)
    }, [fixedData, isSuccess, isError])

    // const submit = async (e: SyntheticEvent) => {
    //     // e.preventDefault()
    //     // if (email && password) {

    //     // } else {
    //     //     console.log('pipka')
    //     // }
    // }
    const langCode = state.data
        ? {
            sourceLang: state.data[0].sourceLang,
            targetLang: state.data[0].targetLang
        }
        : { sourceLang: '', targetLang: '' };


    return (
        <div className='h-screen pt-16'>
            <div className="flex flex-col items-center gap-10 max-w-6xl mx-auto px-4">
                <button
                    className="bg-violet text-white capitalize rounded-md py-2 px-10 text-lg"
                    onClick={testFetch}
                >save all changes</button>

                <table className="min-w-full divide-y divide-lightViolet">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">source language ({langCode.sourceLang})</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">target language ({langCode.targetLang})</th>
                            <th scope="col" className="w-9"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-lightViolet">
                        {state.data?.map((item: any, i: number) => (

                            <TbodyTr
                                key={item._id}
                                {...item}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home