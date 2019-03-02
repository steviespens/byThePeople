import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import TableAll from "./TableAll";
import PropTypes from "prop-types";



const NewsBox = (props) => {
    const fields = ['title'];
    return (
        <div className="news-feed">
            <h2>{props.title}</h2>
            <DataProvider endpoint="api/headline/"
                render={data => <TableAll data={data} fields={fields} />} />
        </div>
    )
};

NewsBox.propTypes = {
    title: PropTypes.string.isRequired,
};

export default NewsBox;

