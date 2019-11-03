import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import RandomPoll from "./RandomPoll";
import PropTypes from "prop-types";



const PollsFeed = (props) => {
    return (
        <div className="single-poll-feed">
            <h2>{props.title}</h2>
            <DataProvider endpoint="api/polls/"
                render={data => <RandomPoll poll={data} />} />

        </div>
    );
};

PollsFeed.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PollsFeed;

