import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import TableAll from "./TableAll";

//unused  component, can DELETE
const PollsPage = () => {
    return (
        <DataProvider endpoint="api/login"
            render={data => <TableAll data={data} fields={fields} />} />
    );
};
const wrapper = document.getElementById("polls");
wrapper ? ReactDOM.render(<PollsPage />, wrapper) : null;
