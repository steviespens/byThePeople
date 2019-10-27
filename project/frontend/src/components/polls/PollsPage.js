import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "../unused/DataProvider";
import TableAll from "../unused/TableAll";

//unused  component, can DELETE
const PollsPage = () => {
    return (
        <DataProvider endpoint="api/login"
            render={data => <TableAll data={data} fields={fields} />} />
    );
};
const wrapper = document.getElementById("polls");
wrapper ? ReactDOM.render(<PollsPage />, wrapper) : null;
