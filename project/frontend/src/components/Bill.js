import React, { Component } from "react";
import ChoiceList from "./ChoiceList";
import PropTypes from "prop-types";
import { useState } from 'react';
import { Radio, RadioGroup } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import BillDialogue from "./BillDialogue";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Document } from 'react-pdf'



{/* <Button onClick={this.handleClickOpen('paper')}>scroll=paper</Button> */}


export default class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        if (this.props.bill == null) {
            return <div></div>
        }
        const title = makeTitle(this.props.bill);
        const billInformation = makeBillInformation(this.props.bill);
        return (
            <div>
                <Card className="bill">
                    <CardHeader title={title} />
                    <CardContent>
                        <Typography component="p">
                            {billInformation[0]}
                            <br />
                            {billInformation[1]}
                            <br />
                            {billInformation[2]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" onClick={this.handleClickOpen}>Full Text</Button>
                    </CardActions>

                </Card>
                <BillDialogue bill={this.props.bill} open={this.state.open} onClose={this.handleClose}/>
            </div>

        );
    }

}

function makeTitle(bill) {
    const id = bill.bill_id;
    const shortTitle = bill.short_title;
    const officialTitle = bill.official_title;
    var title = id.toUpperCase().split('-')[0] + ' - ';
    title += shortTitle != null ? shortTitle : officialTitle;
    return title;
}

function makeBillInformation(bill) {
    const sponsorName = bill.sponsor.name;
    const sponsorState = bill.sponsor.state;
    const sponsorDistrict = bill.sponsor.district;
    const sponsorTitle = bill.sponsor.title;
    const introduced = makeIntroduced(bill.introduced_at);
    const committees = bill.committees.map((c) => (c.committee));
    var line1 = 'Sponsor: ' + sponsorTitle + '. ' + sponsorName + ' [' + sponsorState + '-' + sponsorDistrict + ']';
    var line2 = 'Introduced: ' + introduced;
    var line3 = 'Committees: ' + committees.reverse().join(', ');
    return [line1, line2, line3];

}

//Parameters: string of date in 'yyyy/mm/dd' format
//Returns: string of date in 'mm/dd/yyyy' format
function makeIntroduced(d) {
    var introduced = d.split('-');
    const tmp = introduced[1];
    introduced[1] = introduced[2];
    introduced[2] = tmp;
    return introduced.reverse().join('-');
}


