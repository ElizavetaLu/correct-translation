import { useEffect } from "react";
import { useGetSentencesQuery } from "../features/api/apiSlice";
import { setSentences } from "../features/slices/sentencesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SkeletonLoading from "../components/SkeletonLoading";
import TbodyTr from "../components/table/TbodyTr";


const Home = () => {

    const dispatch = useAppDispatch();

    const { data } = useAppSelector(state => state.sentences);


    //get source and target land code 
    const { sourceLang, targetLang } = data
        ? {
            sourceLang: data[0].sourceLang,
            targetLang: data[0].targetLang
        }
        : { sourceLang: '', targetLang: '' };



    const { data: sentencesArr, isLoading } = useGetSentencesQuery('');

    useEffect(() => {
        if (!isLoading) dispatch(setSentences(sentencesArr));
    }, [isLoading])

    return (
        <div className='h-screen pt-16'>
            <div className="flex flex-col items-center gap-10 max-w-6xl mx-auto px-4">

                <table className="min-w-full divide-y divide-lightViolet">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">source language ({sourceLang})</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">target language ({targetLang})</th>
                            <th scope="col" className="w-9"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-lightViolet">
                        {
                            isLoading
                                ? [...Array(5)].map((item, i) => <SkeletonLoading key={i} />)

                                : data?.map((item: any, i: number) => <TbodyTr

                                    key={item._id}
                                    {...item}
                                />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home