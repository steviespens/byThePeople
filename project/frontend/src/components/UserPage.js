import { randomElement } from "./utilities/helpers.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';




export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentDidMount() {
        fetch('/api/user/').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ user: data });


        });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    onSubmit = e => {
        console.log(e.target.value);
    }


    render() {
        // const user = this.state.user;
        const onSubmit = this.onSubmit;
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
                    <button onClick={onSubmit} type="button" value={this.state.name}/>
                </form>
            </div>

        );
    }
};
// const wrapper = document.getElementById("user");
// console.log(wrapper);
// wrapper ? ReactDOM.render(<UserPage />, wrapper) : null;
