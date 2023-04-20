import { useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { SentencesData } from "../../intefaces/intefaces";
import { useAppDispatch } from "../../app/hooks";
import { setFixedSentence } from "../../features/slices/sentencesSlice";


const TbodyTr = (props: SentencesData) => {


    const dispatch = useAppDispatch();
    // const textareaRef = useRef<HTMLTextAreaElement>(null);

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
                    className={`${isDisabled ? 'bg-transparent' : 'bg-white p-4 rounded'} w-full resize-none outline-none `}
                    // ref={textareaRef}
                    disabled={isDisabled}
                    value={value}
                    onChange={e => setValue(e.target.value)}

                ></textarea>

            </td>

            <td className=" px-6 py-4 hover:cursor-pointer w-1/6">
                {isDisabled
                    ? <div
                        className="flex items-center gap-2 text-gray-700 hover:text-violet transition-all duration-200"
                        onClick={onEditSentence}
                    >
                        <span className="text-sm">Edit</span>

                        <RiPencilFill />
                    </div>
                    : <div className="flex flex-col items-end" >

                        <span onClick={() => setIsDisabled(!isDisabled)}>
                            <IoClose />
                        </span>

                        <button
                            onClick={onSave}
                            className="hover:text-violet transition-all duration-200"
                        >save</button>
                    </div>
                }
            </td>
        </tr >
    )
}

export default TbodyTr