import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { parseBillID } from './utilities/helpers';

import AuthService from './AuthService';
import { reduce } from "bluebird";

// const Auth = new AuthService();

export default class BillDialogue extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            loaded: 'Loading...'
        };
    }

    componentDidMount() {
        const bill = parseBillID(this.props.bill.bill_id);
        this.Auth.fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
            // const x = response;
            const data = JSON.parse(response);
            this.setState({ loaded: data['full_text'] });
        });
    }

    //should add .catch loops to this and componentDidMount
    componentDidUpdate(prevProps) {
        if (this.props.bill !== prevProps.bill) {

            const bill = parseBillID(this.props.bill.bill_id);
            this.Auth.fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
                const data = JSON.parse(response);
                this.setState({ loaded: data['full_text'] });
            });
        }
    }
 
    render() {
        
        const open = this.props.open;
        const onClose = this.props.onClose;
        const title = makeTitle(this.props.bill);
        
        const style = {
            whiteSpace: 'pre-wrap'
        };
    
        return (
            // <Dialog
            //     open={open}
            //     onClose={onClose}
            //     scroll='paper'
            // // aria-labelledby="scroll-dialog-title"
            // >
            //     <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            //     <DialogContent style={style}>
            //         {/* <DialogContentText>
            //             {this.state.loaded}
            //         </DialogContentText> */}
            //         <p>{this.state.loaded}</p>
            //     </DialogContent>
            // </Dialog>
            <Dialog
                open={open}
                onClose={onClose}
                scroll='paper'
            // aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent style={style}>
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

function makeTitle(bill) {
    const id = bill.bill_id;
    const shortTitle = bill.short_title;
    const officialTitle = bill.official_title;
    var title = id.toUpperCase().split('-')[0] + ' - ';
    title += shortTitle != null ? shortTitle : officialTitle;
    return title;
}

