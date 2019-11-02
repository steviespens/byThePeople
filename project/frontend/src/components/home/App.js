import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class App extends Component {

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/register');
    }
  

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    {/* <h2>Welcome {this.props.user.username}</h2> */}
                    <h2>Welcome {this.props.name}</h2>

                </div>
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                </p>
            </div>
        );
    }

}

export default withAuth(App);