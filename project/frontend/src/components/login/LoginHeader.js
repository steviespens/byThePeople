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
import { withRouter } from 'react-router-dom';

import PollsRow from '../polls/PollsRow';
import { isLoggedIn } from '../utilities/helpers';
import RegisterForm from '../login/RegisterForm';


class LoginHeader extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onClick = this.onClick.bind(this);

        // this.state = {
        //     email: '',
        //     password: '',
        // };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                location.reload()
                // this.props.history.replace('/');  //maybe make redirect page
            })
            .catch(err => {
                alert(err);
            })
    }
    onClick() {
        this.props.history.replace('/register');  //maybe make redirect page

    }
    render() {
        return (
            <React.Fragment>
           
            <form className='login-header' onSubmit={this.handleFormSubmit}>
                <input
                    className="header-form-item"
                    placeholder="Email"
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                />
                <input
                    className="header-form-item"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                />
                
                <input
                    className="header-form-submit"
                    value="Login"
                    type="submit"
                />
                
                {/* <a className='header-link' href='127.0.0.1/register'>Register</a> */}
                
                </form>
                <RegisterForm></RegisterForm>
                
            {/* <button className='header-register-button' onClick={this.onClick}>Register</button> */}
            </React.Fragment>
        )
    }
   
};


export default withRouter(LoginHeader);




