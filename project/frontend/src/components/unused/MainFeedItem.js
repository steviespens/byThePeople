import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";


const MainFeedItem = (props) => {
    return (
        <div className="main-feed-item">{props.title}</div>
    );
};

MainFeedItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default MainFeedItem;

