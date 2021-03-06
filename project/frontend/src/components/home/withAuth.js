import React, { Component } from 'react';
import AuthService from './AuthService';

//HOC component responsible for redirecting to login page when 
//  not logged in
//currently commented out to allow access to most application 
//  functionality even when user not logged in 

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        componentDidMount() {
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
        componentDidUpdate() {
            return
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
