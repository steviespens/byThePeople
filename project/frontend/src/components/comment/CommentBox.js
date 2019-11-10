import React, { Component } from "react";
import { useState, useEffect } from 'react';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import AuthService from '../home/AuthService';
import { withStyles, createStyles } from '@material-ui/styles';


function CommentBox(props) {
    
    const Auth = new AuthService();
    const [comments, setComments] = useState([]);
    const [formText, setFormText] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "bill_id": props.id,
            })
        }
        let isSubscribed = true;
        Auth.fetch('/api/comments/get_comment_for_bill/', options).then((data) => {
            if (isSubscribed) {
                if (typeof data[0] !== 'undefined') {
                    setComments(data);
                } else {
                    setComments([]);
                }
                setUpdate(false);
            }
        });

        return () => isSubscribed = false;
         
    }, [props, update]);
 
    return (
        <div className='comment-box'>         
            <CommentForm className='comment-form' id={props.id} formText={formText} setFormText={setFormText} setUpdate={setUpdate}
                onChange={e => {
                    setFormText(e.target.value);                  
                }} />   
            <CommentList comments={comments} />
        </div>

    );
}

const styles = createStyles({
    root: {
        overflow: 'scroll',
    },
});

export default withStyles(styles)(CommentBox);
