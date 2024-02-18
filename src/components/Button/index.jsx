import React from "react";

const Button = ({ onClick, text }) => {
    return (
        <button className="WikiButton" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
