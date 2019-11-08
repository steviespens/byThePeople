import React from "react";

function MainFeedList(props) {
    return (
        <div className="menu-bar">
            {props.children}
        </div>

    );
}

export default MainFeedList;

