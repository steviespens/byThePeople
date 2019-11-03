import React from "react";
import AuthService from '../home/AuthService';
import RegisterForm from '../login/RegisterForm';


class LoginHeader extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
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
            .then(() => {
                location.reload()
            })
            .catch(err => {
                alert(err);
            })
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
                </form>
                <RegisterForm></RegisterForm>
            </React.Fragment>
        )
    }
};

export default LoginHeader;




