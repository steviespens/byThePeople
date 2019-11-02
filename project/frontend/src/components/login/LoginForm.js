import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "../unused/DataProvider";
import Poll from "../polls/Poll";
import PropTypes from "prop-types";
import TextField from '\@material-ui/core/TextField';
import { map } from "bluebird";
import { useState, useEffect, useRef } from 'react';
import AuthService from '../home/AuthService';

import PollsRow from '../polls/PollsRow';



const LoginForm = (props) => {

    useEffect(() => {
      
    }, )
    return (
        <div className="card">
            <h1>Login</h1>
            <form onSubmit={props.handleFormSubmit}>
                <input
                    className="form-item"
                    placeholder="Email goes here..."
                    name="email"
                    type="text"
                    onChange={props.handleChange}
                />
                <input
                    className="form-item"
                    placeholder="Password goes here..."
                    name="password"
                    type="password"
                    onChange={props.handleChange}
                />
                <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                />
            </form>
        </div>
    );
};


export default LoginForm;




