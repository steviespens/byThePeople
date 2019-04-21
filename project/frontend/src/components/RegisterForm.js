import React, { Component } from 'react';
// import './Login.css';
import AuthService from './AuthService';
import AdditionalInfoForm from './AdditionalInfoForm';
import TextField from '@material-ui/core/TextField';


export default class RegisterForm extends Component {
    constructor() {
        super();
        //reqchange
        this.state = {
            open: false,
            email: '',
            password1: '',
            password2: '',
            gender: '',
            politicalParty: '',
            ethnicity: '',
            education: '',
            salary: '',
            age: ''

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

    // handleChange(e) {
    //     this.setState(
    //         {
    //             [e.target.name]: e.target.value
    //         }
    //     )
    // }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    //reqchange
    handleFormSubmit(e) {
        //make sure that all fields are
        e.preventDefault();
        this.Auth.register(this.state.email, this.state.gender, this.state.politicalParty,
            this.state.password1, this.state.password2)
            .then(res => {
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
                        placeholder="Email goes here..."
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    <input
                        className="form-item"
                        placeholder="Password goes here..."
                        name="password1"
                        type="password"
                        value={this.state.password1}
                        onChange={this.handleChange('password1')}
                />
                    <input
                        className="form-item"
                        placeholder="Confirm password"
                        name="password2"
                        type="password"
                        value={this.state.password2}
                        onChange={this.handleChange('password2')}
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
                    gender={this.state.gender}
                    politicalParty={this.state.politicalParty}
                    ethnicity={this.state.ethnicity}
                    salary={this.state.salary}
                    age={this.state.age}

/>

            </div>
        );
    }

}

