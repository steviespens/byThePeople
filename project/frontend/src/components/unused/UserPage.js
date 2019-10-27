import { randomElement } from "../utilities/helpers.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';




export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: '',
            password: '',
            registerName: '',
            registerPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRegister = this.onRegister.bind(this);

    }

    componentDidMount() {
        // fetch('/api/user/').then((response) => {
        //     return response.json();
        // }).then((data) => {
        //     this.setState({ user: data });


        // });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    onSubmit = () => {
        const name = this.state.name;
        const password = this.state.password;
        fetch('api/user/' + name + '/' + password + '/').then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
        });
    }

    onRegister = () => {
        const name = this.state.registerName;
        const password = this.state.registerPassword;
        fetch('api/register/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
        });

    }



    render() {
        // const user = this.state.user;
        const onSubmit = this.onSubmit;
        const onRegister = this.onRegister;
        return (
            <div>
                {/* ({this.state.user} == null ? <div>hi</div> : <div>{this.state.user.user}</div>) */}
                <form className="username-form" noValidate autoComplete="off">
                    <TextField
                        id="username"
                        label="Username"
                        // className=
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        // className=
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    

                    <button onClick={onSubmit} type="button"> Login </button>
                </form>
                <form className="register-form" noValidate action="api/register/"
                    method="post" autoComplete="off">
                    {/* <TextField
                        id="username"
                        label="Username"
                        // className=
                        value={this.state.registerName}
                        onChange={this.handleChange('registerName')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        // className=
                        value={this.state.registerPassword}
                        onChange={this.handleChange('registerPassword')}
                        margin="normal"
                    /> */}
                    <input type="text" name="username"></input>
                    <input type="password" name="password1"></input>
                    <input type="password" name="password2"></input>

                    <input type="submit" value="Submit"></input>


                    {/* <button onClick={onRegister} type="button"> Register </button> */}
                </form>


            </div>

        );
    }
};
// const wrapper = document.getElementById("user");
// console.log(wrapper);
// wrapper ? ReactDOM.render(<UserPage />, wrapper) : null;
