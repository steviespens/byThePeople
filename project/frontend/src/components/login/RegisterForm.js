import React, { Component } from 'react';
import AuthService from '../home/AuthService';
import AdditionalInfoForm from './AdditionalInfoForm';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            email: '',
            password1: '',
            password2: '',
            gender: '',
            political_party: '',
            ethnicity: '',
            education: '',
            salary: '',
            age: '',
            errorMessage: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService()
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
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleFormSubmit(e) {
        e.preventDefault();
        this.Auth.register(
            this.state.email,
            this.state.gender,
            this.state.political_party,
            this.state.ethnicity,
            this.state.education,
            this.state.salary,
            this.state.age,
            this.state.password1,
            this.state.password2)
            .then(() => {
                location.reload()
            })
            .catch(err => {
                let m = JSON.parse(err.message);
                const errmsgs = Object.keys(m).map((k) => {
                    return <p className='registration-error-msg' key={k}>{k + ': ' + m[k][0]['message']}</p>
                })
                this.setState(
                    {
                        errorMessage:
                            (<div className='registration-error-list'>
                                <p className='registration-error-msg'>The following errors occured when processing your registration:</p>
                                {errmsgs}
                            </div>)
                    }
                )      
            })
    }

    render() {
        return (
            <React.Fragment>
                    <button className='header-register-button' onClick={this.handleClickOpen}>Register</button>
                    <AdditionalInfoForm
                        open={this.state.open}
                        onClose={this.handleClickClose}
                        handleFormSubmit={this.handleFormSubmit}
                        handleChange={this.handleChange}
                        email={this.state.email}
                        password1={this.state.password1}
                        password2={this.state.password2}
                        gender={this.state.gender}
                        political_party={this.state.political_party}
                        ethnicity={this.state.ethnicity}
                        education={this.state.education}
                        salary={this.state.salary}
                        age={this.state.age}
                        errorMessage={this.state.errorMessage}
                        />
            </React.Fragment>
        );
    }
}

export default RegisterForm;
