import React from "react";
import ReactDOM from "react-dom";

const HeaderBar = () => {
    return (
        // <div className="header-bar">
            <React.Fragment>
            {/* <img className='logo' src="https://bythepeople.s3.amazonaws.com/favicon.jpg">
            </img> */}
                <a href="/">By The People</a>
            </React.Fragment>
        // </div>
    );
};
const wrapper = document.getElementById("header-bar");
wrapper ? ReactDOM.render(<HeaderBar />, wrapper) : null;
