import React, { Component } from 'react';
// import './Login.css';
import AuthService from './AuthService';
import AdditionalInfoForm from './AdditionalInfoForm';


export default class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }

    
    handleClickOpen = () => {
        this.setState({ open: true });
    }
    handleClickClose = () => {
        this.setState({ open: false });
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
        console.log(this.state);
        this.Auth.register(this.state.username, this.state.password1, this.state.password2)
            .then(res => {
                console.log(this.props.history)
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }


    render() {
        return (
            <div className="card">
                <h1>Register</h1>
                {/* <form onSubmit={this.handleFormSubmit}> */}
                <form>

                    <input
                        className="form-item"
                        placeholder="Username goes here..."
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here..."
                        name="password1"
                        type="password"
                        onChange={this.handleChange}
                />
                    <input
                        className="form-item"
                        placeholder="Confirm password"
                        name="password2"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-submit"
                        value="SUBMIT"
                        type="button"
                        onClick={this.handleClickOpen}
                    />
                </form>
                <AdditionalInfoForm
                    open={this.state.open}
                    onClose={this.handleClickClose}
                    handleFormSubmit={this.handleFormSubmit}
                    handleChange={this.handleChange}

                />

            </div>
        );
    }

}

