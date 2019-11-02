import React, { Component } from 'react';
// import './Login.css';
import AuthService from '../home/AuthService';
import AdditionalInfoForm from './AdditionalInfoForm';
import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
    constructor() {
        super();
        //reqchange
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
        console.log(this.state)
        e.preventDefault();
        this.Auth.register(this.state.email, this.state.gender, this.state.political_party, this.state.ethnicity, this.state.education, this.state.salary, this.state.age,
            this.state.password1, this.state.password2)
            .then(res => {
                // console.log(res)
                location.reload()
                // this.props.history.replace('/');
            })
            .catch(err => {
                let m = JSON.parse(err.message);

                const mm = Object.keys(m).map((k) => {
                    return <p className='registration-error-msg' key={k}>{k + ': ' + m[k][0]['message']}</p>
                })
                this.setState({errorMessage:
                    (
                        <div className='registration-error-list'>
                            <p className='registration-error-msg'>The following errors occured when processing your registration:</p>
                            {mm}
                        </div>
                        // <p>The following errors occured when pr ocessing your registration:</p>
                       
                    )
                })
                // if ('email' in m) {
                //     alert('A valid email address is required')
                // }
                // else if ('password2' in m) {
                //     alert('Passwords must match')
                // } else {
                //     alert('All fields required')
                // }                
            })
    }


    render() {
        return (
        <React.Fragment>
            {/* // <div className="card">
            //     <h1>Register</h1>
                {/* <form onSubmit={this.handleFormSubmit}> */}
                {/* // <form> */}
                <button className='header-register-button' onClick={this.handleClickOpen}>Register</button>

{/* 
                    <input
                        className="form-item"
                        placeholder="Email"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    <input
                        className="form-item"
                        placeholder="Password"
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
                </form> */}
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
            // {/* // </div> */}
        );
    }

}
export default withRouter(RegisterForm);
