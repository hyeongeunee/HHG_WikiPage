import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const WikiItem = ({ id, title, content, date }) => {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`/wiki/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="WikiItem">
            <div onClick={goDetail} className="goDetail">
                <p>상세 보기</p>
            </div>
            <div onClick={goDetail} className="info_wrapper">
                <div className="wiki_date">{strDate}</div>
                <div className="wiki_title">{title}</div>
                <div className="wiki_content_preview">{content.slice(0, 25)}</div>
            </div>
            <div onClick={goEdit} className="btn_wrapper">
                <Button text={"수정하기"} />
            </div>
        </div>
    );
};

export default React.memo(WikiItem);
