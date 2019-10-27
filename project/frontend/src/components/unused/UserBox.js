import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import UserPage from "./UserPage";


const UserBox = () => {
    return (
        <UserPage />
    );
};
const wrapper = document.getElementById("user");
wrapper ? ReactDOM.render(<UserBox />, wrapper) : null;
