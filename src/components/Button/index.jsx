import React from "react";

const Button = ({ onClick, color, text }) => {
    const btnColor = ["blue", "red", "green"].includes(color) ? color : "default";

    return (
        <button className={["WikiButton", `WikiButton_${color}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

Button.defaultProps = {
    color: "default",
};

export default Button;
