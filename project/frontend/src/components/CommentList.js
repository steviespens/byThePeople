import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import Comment from "./Comment";
import AuthService from "./AuthService"
import List from '@material-ui/core/List';
import { withStyles, createStyles } from '@material-ui/styles';


const styles = createStyles({
    root: {
        overflow: 'auto',
       
    },

});

function CommentList(props) {
  
    const list = props.comments.map(c => {

        return <Comment key={c.id} comment={c} />;
    });
    
    return (
        <div className={props.classes.root}>
            {list}
        </div>
    );
}

export default withStyles(styles)(CommentList);

       


