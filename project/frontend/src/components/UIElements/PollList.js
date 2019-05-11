import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'column',
        margin: '0%',
        padding: '1%',
        alignItems: 'center',

    },
    heading: {
        margin: '0%',
    },
   
});


function PollList(props) {

    const question = props.question;

    return (
        <div className={props.classes.root}>
            <h6 className={props.classes.heading}>{question}</h6>
            {props.children}
            <h6>{props.numVotes}</h6>
        </div>
    );

}
export default withStyles(styles)(PollList);

