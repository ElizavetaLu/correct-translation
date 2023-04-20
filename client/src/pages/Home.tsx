import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSentencesQuery, useSetFixedSentencesMutation } from "../features/api/apiSlice";
import { setSentences } from "../features/slices/sentencesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TbodyTr from "../components/table/TbodyTr";


const isAuth = localStorage.getItem("token");

const Home = () => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.sentences);


    const { data, isLoading } = useGetSentencesQuery('');

    useEffect(() => {
        if (!isLoading) dispatch(setSentences(data));
    }, [isLoading])



    const [setFixedSentences, { isSuccess, isError }] = useSetFixedSentencesMutation();

    const saveAllChanges = async (e: SyntheticEvent) => {
        await setFixedSentences(state.fixedData);
    }


    const langCode = state.data
        ? {
            sourceLang: state.data[0].sourceLang,
            targetLang: state.data[0].targetLang
        }
        : { sourceLang: '', targetLang: '' };


    return (
        <>
            {isAuth

                ? <div className='h-screen pt-16'>
                    <div className="flex flex-col items-center gap-10 max-w-6xl mx-auto px-4">
                        <button
                            className="bg-violet text-white capitalize rounded-md py-2 px-10 text-lg"
                            onClick={saveAllChanges}
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
                :
                <center className="mt-9" >
                    <Link
                        className="bg-violet text-white capitalize rounded-md py-2 px-10 text-lg"
                        to='/login'
                    > log in </Link>
                </center>
            }
        </>
    )
}

export default Home