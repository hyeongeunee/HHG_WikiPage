import { useContext, useEffect, useState } from "react";

import Button from "../../components/Button";
import WikiHeader from "../../components/WikiHeader";
import WikiList from "../../components/WikiList";

import { WikiStateContext } from "../../App";

const Home = () => {
    const wikiList = useContext(WikiStateContext);

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        if (wikiList.length >= 1) {
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();

            setData(wikiList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [wikiList, curDate]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };

    return (
        <div>
            <WikiHeader
                headText={"Wiki Page"}
                leftChild={<Button text={"<"} onClick={decreaseMonth} />}
                rightChild={<Button text={">"} onClick={increaseMonth} />}
            />
            <WikiList wikiList={wikiList} />
        </div>
    );
};

export default Home;
