import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import TableAll from "./TableAll";
import PropTypes from "prop-types";



const DocketBox = (props) => {
    const fields = ['description'];
    return (
        <div className="docket-feed">
            <h2>{props.title}</h2>
            <DataProvider endpoint="api/upcomingbill/"
                render={data => <TableAll data={data} fields={fields} />} />
        </div>
    )
};

DocketBox.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DocketBox;

