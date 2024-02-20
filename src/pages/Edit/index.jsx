// 수정
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WikiStateContext } from "../../App";
import WikiEditor from "../../components/WikiEditor";

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const wikiList = useContext(WikiStateContext);

    useEffect(() => {
        if (wikiList.length >= 1) {
            const targetWiki = wikiList.find((it) => parseInt(it.id) === parseInt(id));
            if (targetWiki) {
                setOriginData(targetWiki);
            } else {
                alert("존재하지 않는 게시글입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, wikiList]);

    return <div>{originData && <WikiEditor isEdit={true} originData={originData} />}</div>;
};

export default Edit;
