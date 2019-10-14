import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        justifyContent: 'space-evenly',
        display: 'flex',
        flexDirection: 'column',
        margin: '0%',
        padding: '3%',
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
            <h6 className={props.classes.heading}>{question}</h6>
            {props.children}
            {/* <div>
                {props.children}
            </div> */}
            <h6 className={props.classes.heading}>{props.numVotes}</h6>
        </div>
    );

}
export default withStyles(styles)(PollList);

