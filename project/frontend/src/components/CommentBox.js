import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import AuthService from './AuthService';
import { withStyles, createStyles } from '@material-ui/styles';


const styles = createStyles({
    root: {
        overflow: 'scroll',

    },

});

function CommentBox(props) {

    const [comments, setComments] = useState([]);
    // const [id, setId] = useState(props.id);
    const Auth = new AuthService();
    const [formText, setFormText] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        
        Auth.fetch('/comments/get_comment_for_bill/' + props.id + '/').then((data) => {
            if (typeof data[0] !== 'undefined') {
                setComments(data);
            } else {
                setComments([]);
            }
            setUpdate(false);
        });
        return () => {
            return;
        }
    }, [props, update]);
 
    return (
        <div className={props.classes.root}>         
            <CommentList comments={comments}/>
            <CommentForm id={props.id} formText={formText} setFormText={setFormText} setUpdate={setUpdate}
                onChange={e => {
                    setFormText(e.target.value);                  
                }} />           
        </div>

    );
}
export default withStyles(styles)(CommentBox);
