import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import TableAll from "./TableAll";














const Docket = () => {
    //implicity returns this because its an expression
    //endpoint is used by fetch in DataProvider, render passes a closure that has one parameter data and returns a Table object
    //the below syntax is passing two props to the DataProvider component
    //find out where this api data is coming from, this is what you will want to modify to interact with db
    const fields = ['chamber', 'description'];
    return (<DataProvider endpoint="api/upcomingbill/"
        render={data => <TableAll data={data} fields={fields}/>} />)
};
//gets the wrapper div from templates/frontend/index.html 
const wrapper = document.getElementById("docket");
//calls ReactDOM.render with the App and wrapper arguments
wrapper ? ReactDOM.render(<Docket />, wrapper) : null;
