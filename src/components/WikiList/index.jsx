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

const WikiList = ({ wikiList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");

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
        return sortedList;
    };

    return (
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
    );
};

WikiList.defaultProps = {
    wikiList: [],
};

export default WikiList;
