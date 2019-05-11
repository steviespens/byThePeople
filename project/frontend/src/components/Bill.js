import React, { Component } from "react";
import ChoiceList from "./ChoiceList";
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
import CommentBox from "./CommentBox";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';


const styles = {
    root: {

    },
    commentBox: {
        border: '1px solid black',
        borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'red',
        // height: 48,
        // padding: '0 30px',
    },
};

{/* <Button onClick={this.handleClickOpen('paper')}>scroll=paper</Button> */}


class Bill extends Component {
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
        const { classes } = this.props;
        return (
            // <div>
            //     <Card className="bill">
            //         <CardHeader title={title} />
            //         <CardContent>
            //             <Typography component="p">
            //                 {billInformation[0]}
            //                 <br />
            //                 {billInformation[1]}
            //                 <br />
            //                 {billInformation[2]}
            //             </Typography>
            //         </CardContent>
            //         <CardActions>
            //             <Button variant="outlined" onClick={this.handleClickOpen}>Full Text</Button>
            //         </CardActions>
            //         <CommentBox className={classes.commentBox} id={this.props.id}/>
            //     </Card>
            //     <BillDialogue bill={this.props.bill} open={this.state.open} onClose={this.handleClose}/>
            // </div>
            <div className="bill">
                <h3>{title}</h3>
                <h6>{billInformation[0]}</h6>
                <h6>{billInformation[1]}</h6>
                <h6>{billInformation[2]}</h6>
                <button onClick={this.handleClickOpen}>Full Text</button>
                <CommentBox className={classes.commentBox} id={this.props.id} />
                <BillDialogue bill={this.props.bill} open={this.state.open} onClose={this.handleClose} />
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

Bill.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bill);



