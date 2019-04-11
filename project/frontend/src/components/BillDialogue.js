import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { parseBillID } from './utilities/helpers';

import AuthService from './AuthService';
const Auth = new AuthService();

export default class BillDialogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: 'Loading...'
        };
    }

    componentDidMount() {
        const bill = parseBillID(this.props.bill.bill_id);
        Auth.fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
            return response;
        }).then((data) => {
            this.setState({ loaded: data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.bill !== prevProps.bill) {
            const bill = parseBillID(this.props.bill.bill_id);
            Auth.fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
                return response;
            }).then((data) => {
                this.setState({ loaded: data });
            });
        }
    }
 
    render() {
        const open = this.props.open;
        const onClose = this.props.onClose;
    
        return (
            <Dialog
                open={open}
                onClose={onClose}
                scroll='paper'
            // aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText>
                        {this.state.loaded}
                    </DialogContentText> */}
                    <p>{this.state.loaded}</p>
                </DialogContent>
            </Dialog>
        );
    }

    // fetch(url, options) {
    //     // performs api calls sending the required authentication headers
    //     const csrftoken = 'mchgeVYDi2ZDbIuPcABORE9EuClmvIk8lUNQbUeCDNtowZaQYNNSMkvLA3pF1XuQ';
    //     console.log('cal')

    //     const headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': csrftoken
    //     }

    //     if (this.loggedIn()) {
    //         headers['Authorization'] = 'Bearer ' + this.getToken()

    //     }

    //     return fetch(url, {
    //         headers,
    //         ...options
    //     })
    //         // .then(this._checkStatus)
    //         .then(response => {
    //             // console.log(response.json());
    //             return response.json();
    //         }
    //         )
    // }

    // _checkStatus(response) {
    //     // raises an error in case response status is not a success
    //     if (response.status >= 200 && response.status < 300) {
    //         return response
    //     } else {
    //         var error = new Error(response.statusText)
    //         error.response = response
    //         throw error
    //     }
    // }


}
