import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import WikiItem from "../WikiItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
    };

    return (
        <select className="ControlMenu" value={value} onChange={handleChange}>
            {optionList.map((option, idx) => (
                <option key={idx} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
});

const ITEMS_PER_PAGE = 5;

const WikiList = ({ wikiList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);

    const getProcessedWikiList = () => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(wikiList));

        const sortedList = copyList.sort(compare);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sortedList.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(wikiList.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <div className="WikiList">
                <div className="menu_wrapper">
                    <div className="left_col">
                        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    </div>
                    <div className="right_col">
                        <Button
                            text={"새 글작성"}
                            onClick={() => {
                                navigate("/new");
                            }}
                        />
                    </div>
                </div>
                {getProcessedWikiList().map((it) => (
                    <WikiItem key={it.id} {...it} />
                ))}
            </div>
            <div className="pagination">
                <Button text={"이전 페이지"} onClick={handlePrevPage} disabled={currentPage === 1} />
                <p>{`${currentPage} / ${totalPages}`}</p>
                <Button text={"다음 페이지"} onClick={handleNextPage} disabled={currentPage === totalPages} />
            </div>
        </>
    );
};

WikiList.defaultProps = {
    wikiList: [],
};

export default WikiList;
