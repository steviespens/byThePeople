import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import TableAll from "./TableAll";


const News = () => {
    const fields = ['title', 'description'];
    return (
        <DataProvider endpoint="api/headline/"
        render={data => <TableAll data={data} fields={fields}/>} />
    );
};
const wrapper = document.getElementById("news");
wrapper ? ReactDOM.render(<News />, wrapper) : null;
