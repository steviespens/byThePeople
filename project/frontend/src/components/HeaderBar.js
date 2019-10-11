import React from "react";
import ReactDOM from "react-dom";

const HeaderBar = () => {
    return (
        <div className="header-bar">
            {/* <img src="https://news.harvard.edu/wp-content/uploads/2018/07/CONSTITUTION_iStock-923052552_2500.jpg?w=1600&h=900&crop=1">
            </img> */}
            <a href="/">By The People</a>
        </div>
    );
};
const wrapper = document.getElementById("header-bar");
wrapper ? ReactDOM.render(<HeaderBar />, wrapper) : null;
