import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WikiStateContext } from "../../App";
import WikiHeader from "../../components/WikiHeader";
import Button from "../../components/Button";
import { getStringDate } from "../../util/date";

const Wiki = () => {
    const { id } = useParams();
    const wikiList = useContext(WikiStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        if (wikiList.length >= 1) {
            const targetWiki = wikiList.find((it) => parseInt(it.id) === parseInt(id));
            if (targetWiki) {
                setData(targetWiki);
            } else {
                alert("존재하지 않는 게시글입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, wikiList]);

    if (!data) {
        return <div className="WikiPage">로딩중입니다...</div>;
    } else {
        return (
            <div className="WikiPage">
                <WikiHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
                    rightChild={<Button text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <article>
                    <section>
                        <h3>제목</h3>
                        <div className="wiki_content_wrapper">
                            <p className="wiki_title">{data.title}</p>
                        </div>
                    </section>
                    <section>
                        <h4>내용</h4>
                        <div className="wiki_content_wrapper">
                            <p className="wiki_content">{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Wiki;
