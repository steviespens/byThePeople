import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { parseBillID } from './utilities/helpers';


export default class BillDialogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: 'Loading...'
        };
    }

    componentDidMount() {
        const bill = parseBillID(this.props.bill.bill_id);
        fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ loaded: data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.bill !== prevProps.bill) {
            const bill = parseBillID(this.props.bill.bill_id);
            fetch('api/textfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
                return response.json();
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


}
