import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        // justifyContent: 'center',


    },
  
});


function CommentItem(props) {


    return (
        <div className={props.classes.root}>
            <h6 className={props.classes.heading}>{question}</h6>
            <div className={props.classes.div}>
                {props.children}
            </div>
        </div>
    );

}
export default withStyles(styles)(CommentItem);

