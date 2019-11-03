import React, { Component } from 'react';
import AuthService from '../home/AuthService';
import withAuth from '../home/withAuth';

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