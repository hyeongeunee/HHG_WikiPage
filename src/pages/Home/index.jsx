import { useState } from "react";
import Button from "../../components/Button";
import WikiHeader from "../../components/WikiHeader";
import WikiList from "../../components/WikiList";

const Home = () => {
    const onClick = () => {
        alert("버튼 클릭");
    };

    const [data, setData] = useState([]);

    return (
        <div>
            <WikiHeader
                headText={"Wiki Page"}
                leftChild={<Button text={"<"} onClick={onClick} />}
                rightChild={<Button text={">"} onClick={onClick} />}
            />
            <WikiList WikiList={data} />
        </div>
    );
};

export default Home;
