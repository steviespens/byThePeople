import React, { Component } from 'react';
// import './Login.css';
import RegisterForm from './RegisterForm'
import AuthService from './AuthService';
import LoginForm from './LoginForm';

class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService()
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }


    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <div className="login">
                <div className='left'>
                        <img
                            className='img1'
                            src='https://bythepeople.s3.amazonaws.com/btppic1.png'
                        >
                        </img>
                        <p className='p1'>
                            View recent bills in Congress and express an opinion
                        </p>
                        <img
                            className='img2'
                            src='https://bythepeople.s3.amazonaws.com/btppic2.png'
                        >
                        </img>
                        <p className='p2'>
                            Vote on the topics that interest you most
                        </p>
                        <img
                            className='img3'
                            src='https://bythepeople.s3.amazonaws.com/btppic3.png'
                        >
                        </img>
                        <p className='p3'>
                            See what your Reps have been up to
                        </p>
                </div>
                <div className="right">
                    <div className="card">
                        <h1>Login</h1>
                        <form onSubmit={this.handleFormSubmit}>
                            <input
                                className="form-item"
                                placeholder="Email"
                                name="email"
                                type="text"
                                onChange={this.handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                            />
                            <input
                                className="form-submit"
                                value="SUBMIT"
                                type="submit"
                            />
                        </form>
                    </div>
                    <RegisterForm history={this.props.history} />

                </div>
            </div>
        );
    }

}

export default Login;