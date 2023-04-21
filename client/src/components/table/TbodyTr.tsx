import { useState } from "react";
import { setFixedSentence } from "../../features/slices/sentencesSlice";
import { SentencesData } from "../../intefaces/intefaces";
import { useAppDispatch } from "../../app/hooks";

import { RiPencilFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";


const TbodyTr = (props: SentencesData) => {


    const dispatch = useAppDispatch();

    const [value, setValue] = useState(props.targetText)
    const [isDisabled, setIsDisabled] = useState(true)


    const onEditSentence = () => {
        setIsDisabled(!isDisabled);
    }

    const onSave = () => {
        dispatch(setFixedSentence({ ...props, targetText: value }))
        setIsDisabled(!isDisabled);
    }

    return (
        <tr>
            <td className="pl-6 py-4 text-sm text-gray-800 w-3/6">{props.sourceText}</td>
            <td className="pl-6 py-4 text-sm text-gray-800 w-3/6">

                <textarea
                    className={`${isDisabled ? 'bg-transparent' : 'bg-white p-4 rounded'} w-full resize-none outline-none font-poppins`}
                    disabled={isDisabled}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

            </td>

            <td className=" px-6 py-4 hover:cursor-pointer w-1/6">
                {isDisabled
                    ? <div
                        className="flex items-center gap-2 text-gray-700 hover:text-violet transition-all duration-200"
                        onClick={onEditSentence}
                    >
                        <span className="text-sm text-gray-700">Edit</span>

                        <RiPencilFill />
                    </div>
                    : <div className="flex flex-col items-end gap-2" >

                        <span onClick={() => setIsDisabled(!isDisabled)}> <IoClose /> </span>

                        <button
                            onClick={onSave}
                            className="text-sm text-gray-700 hover:text-violet transition-all duration-200"
                        >save</button>
                    </div>
                }
            </td>
        </tr >
    )
}

export default TbodyTr