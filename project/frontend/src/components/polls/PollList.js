import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

function PollList(props) {
    const question = props.question;

    return (
        <div className={props.classes.root}>
            <p className={props.classes.heading}>{question}</p>
            {props.children}
            <p className={props.classes.heading}>{props.numVotes}</p>
        </div>
    );
}

const styles = createStyles({
    root: {
        justifyContent: 'space-evenly',
        display: 'flex',
        flexDirection: 'column',
        margin: '0%',
        padding: '4%',
        alignItems: 'center',
        height: '80%',
        alignSelf: 'center',
    },
    heading: {
        margin: '0%',
        fontSize: '1.1rem',
        whiteSpace: 'normal',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center',
    },

});

export default withStyles(styles)(PollList);

