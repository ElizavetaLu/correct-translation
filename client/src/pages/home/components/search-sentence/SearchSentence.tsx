import { Dispatch, SyntheticEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentences, setSearchTerm } from "../../../../store/actions/actionCreators";
import "./SearchSentence.scss";


const SearchSentence = () => {

    const { searchTerm, sourceLang, targetLang } = useSelector((state: any) => state.sentences);
    const dispatch: Dispatch<any> = useDispatch();


    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        dispatch(getSentences(true, {
            pageNumber: 1,
            sourceLang: sourceLang.code,
            targetLang: targetLang.code,
            searchTerm,
        }));
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {

            dispatch(getSentences(true, {
                searchTerm,
                pageNumber: 1,
                sourceLang: sourceLang.code,
                targetLang: targetLang.code,
            }))
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [searchTerm])


    return (
        <form className="search" onSubmit={onSearchSubmit} >
            <input
                type="text"
                className="search__input"
                placeholder="Search"
                value={searchTerm}
                onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
            < button type="submit" className="search__button" >
                <img src="/images/icons/search.png" alt="search" className="search__icon" />
            </button>
        </form>
    )
}
export default SearchSentence