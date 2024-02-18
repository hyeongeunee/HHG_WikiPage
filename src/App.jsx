import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Wiki from "./pages/Wiki";

import Button from "./components/Button";
import WikiHeader from "./components/WikiHeader";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <WikiHeader
                    headText={"헤더 입니다~~"}
                    leftChild={
                        <Button
                            text={"왼쪽 버튼"}
                            onClick={() => {
                                alert("왼쪽 클릭");
                            }}
                        />
                    }
                    rightChild={
                        <Button
                            text={"오른쪽 버튼"}
                            onClick={() => {
                                alert("오른쪽 클릭");
                            }}
                        />
                    }
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/wiki/:id" element={<Wiki />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
