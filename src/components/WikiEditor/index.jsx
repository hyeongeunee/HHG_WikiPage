import { useNavigate } from "react-router-dom";
import Button from "../Button";
import WikiHeader from "../WikiHeader";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { WikiDispatchContext } from "../../App";
import { getStringDate } from "../../util/date";

const WikiEditor = ({ isEdit, originData }) => {
    const titleRef = useRef(); // 제목 입력
    const contentRef = useRef(); // 내용 입력
    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [date, setDate] = useState(getStringDate(new Date())); // 날짜 상태

    const { onCreate, onEdit, onRemove } = useContext(WikiDispatchContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "게시글을 수정하시겠습니까?" : "새로운 게시글을 작성하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, title, content);
            } else {
                onEdit(originData.id, date, title, content);
            }
        }
        navigate("/", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setTitle(originData.title);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="WikiEditor">
            <WikiHeader
                headText={isEdit ? "게시글 수정하기" : "새 게시글 작성"}
                leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
                rightChild={isEdit && <Button color={"red"} text={"삭제하기"} onClick={handleRemove} />}
            />
            <div>
                <section>
                    <h4>날짜</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h3>제목 입니다.</h3>
                    <div className="input_box text_wrapper">
                        <input
                            className="input_title"
                            placeholder="제목"
                            ref={titleRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>게시글 작성하기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="게시글 작성하기"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
            </div>
            <section>
                <div className="control_box">
                    <Button color={"red"} text={"취소하기"} onClick={() => navigate(-1)} />
                    <Button color={"green"} text={"작성완료"} onClick={handleSubmit} />
                </div>
            </section>
        </div>
    );
};

export default WikiEditor;
