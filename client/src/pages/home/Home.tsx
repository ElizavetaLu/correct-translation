import { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPopupMessage, showPopup } from "../../store/actions/actionCreators";
import { ILanguage } from "../../intefaces/intefaces";

import SearchSentence from "./components/search-sentence/SearchSentence";
import SelectLanguage from "./components/select-language/SelectLanguage";
import AddSentence from "./components/add-sentence/AddSentence";
import Popup from "../../components/popup/Popup";
import Table from "./components/table/Table";
import "./Home.scss";


const Home = () => {

    const dispatch: Dispatch<any> = useDispatch();



    const { isShown, message } = useSelector((state: any) => state.popup)

    useEffect(() => {
        if (isShown) {
            setTimeout(() => {
                dispatch(showPopup());
                dispatch(setPopupMessage(''));
            }, 4000)
        }
    }, [isShown])


    return (
        <main className="main">
            <Popup isShown={isShown} message={message} toggle={() => dispatch(showPopup())} />
            <SearchSentence />

            <SelectLanguage />

            <AddSentence />

            <div className="sentences">
                <Table />
            </div>
        </main>
    )
}

export default Home