import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Wiki from "./pages/Wiki";

import React, { useReducer, useRef } from "react";

import Button from "./components/Button";
import WikiHeader from "./components/WikiHeader";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
            break;
        }
        default:
            return state;
    }
    return newState;
};

export const WikiStateContext = React.createContext();
export const WikiDispatchContext = React.createContext();

const dummyData = [
    {
        id: 1,
        title: "게시글 1번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271931,
    },
    {
        id: 2,
        title: "게시글 2번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271934,
    },
    {
        id: 3,
        title: "게시글 3번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271935,
    },
    {
        id: 4,
        title: "게시글 4번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271936,
    },
    {
        id: 5,
        title: "게시글 5번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271937,
    },
    {
        id: 6,
        title: "게시글 6번",
        content:
            "상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다. 상세 글 내용입니다.",
        date: 1695016271947,
    },
];

function App() {
    const [data, dispatch] = useReducer(reducer, dummyData);

    console.log(new Date().getTime());

    const dataId = useRef(0);

    //CREATE
    const onCreate = (date, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
            },
        });
        dataId.current += 1;
    };

    //REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };

    //EDIT
    const onEdit = (targetId, date, content) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
            },
        });
    };

    return (
        <WikiStateContext.Provider value={data}>
            <WikiDispatchContext.Provider
                value={{
                    onCreate,
                    onEdit,
                    onRemove,
                }}
            >
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
            </WikiDispatchContext.Provider>
        </WikiStateContext.Provider>
    );
}

export default App;
