import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

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
        width: '100%',


    },
    heading: {
        margin: '0%',
        fontSize: '1.1rem',
        // wordBreak: 'normal',
        // maxWidth: '100px',
        whiteSpace: 'normal',
        alignItems: 'center',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',


        
    },
   
});


function PollList(props) {
    const question = props.question;

    return (
        <div className={props.classes.root}>
            <p className={props.classes.heading}>{question}</p>
            {props.children}
            {/* <div>
                {props.children}
            </div> */}
            <p className={props.classes.heading}>{props.numVotes}</p>
        </div>
    );

}
export default withStyles(styles)(PollList);

