import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService(); //changed from 8080
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        
        componentWillMount() {
            // if (!Auth.loggedIn()) {
            //     try {
            //         // console.log('tried Auth.refresh')
            //         Auth.refresh();
            //         const profile = Auth.getProfile()
                    
            //         this.setState({
            //             user: profile
            //         })
            //         // console.log('got profile')
            //     }
            //     catch (err) {
            //         // console.log('caught err in Auth.refresh')
            //         console.log(err)
            //         Auth.logout()
            //         this.props.history.replace('/register')
            //     }
            // }
            // else {
            //     try {
            //         const profile = Auth.getProfile()
            //         this.setState({
            //             user: profile
            //         })
            //     }
            //     catch (err) {
            //         Auth.logout()
            //         this.props.history.replace('/register')
            //     }
            // }
        }
        componentWillUpdate() {
            console.log('component will update')
        }

        render() {
            if (true || this.state.user) {

                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />

                )
            }
            else {
                return null
            }
        }
    };
}

