import { useState } from "react";
import TinyDDInput from "../../../../components/inputs/tiny-dropdown-input/TinyDDInput";
import "./Table.scss";

const items = [
    {
        "_id": 1,
        "sourceLang": "en",
        "sourceText": "When you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 2,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 3,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 4,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 5,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 6,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    },
    {
        "_id": 7,
        "sourceLang": "en",
        "sourceText": "Yeah, when you fell off the ladder, you tore the ligament that connects the two.",
        "targetLang": "uk",
        "targetText": "Да, когда вы упали с лестницы, вы разорвали соединяющее их сухожилие."
    }
]

const Table = () => {

    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="table">

            {items.map((item, i) => {
                return active === i
                    ? <div key={i} className="row">
                        <div className="row__item-active">
                            <textarea value={item.sourceText} className="row__textarea"></textarea>
                            <div className="row__select-lang">
                                <TinyDDInput lang={item.sourceLang} />
                            </div>
                        </div>
                        <div className="row__item-active">
                            <textarea value={item.targetText} className="row__textarea"></textarea>
                            <div className="row__select-lang">
                                <TinyDDInput lang={item.targetLang} />
                            </div>
                        </div>

                        <div className="row__buttons">
                            <div className="row__button-container">
                                <img className="row__button" src="/images/icons/save.png" alt="save" />
                            </div>
                            <div className="row__button-container" onClick={() => setActive(null)}>
                                <img className="row__button" src="/images/icons/cancel.png" alt="cancel" />
                            </div>
                        </div>

                    </div>

                    : <div key={i} className="row">
                        <div className="row__item" onClick={() => setActive(i)}>{item.sourceText}</div>
                        <div className="row__item" onClick={() => setActive(i)}>{item.targetText}</div>
                    </div>

            })}


        </div>
    )
}

export default Table