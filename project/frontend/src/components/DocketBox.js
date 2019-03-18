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
        <div id="docket-box">
            <h5>{props.title}</h5>
            <DataProvider endpoint="api/upcomingbill/"
                render={data => <TableAll data={data.reverse()} fields={fields} />} />
        </div>
    )
};

DocketBox.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DocketBox;

