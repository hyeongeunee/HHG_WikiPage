// 상세 페이지

import { useParams } from "react-router-dom";

const Wiki = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <h1>Wiki</h1>
            <p>상세 페이지 입니다.</p>
        </div>
    );
};

export default Wiki;
