import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AuthService from '../home/AuthService';



export default function CommentForm(props) {

    const [id, setId] = useState(props.id);
    const Auth = new AuthService();
   
    useEffect(() => {
        props.setFormText('');
    }, [props.id]);

    const submit = () => {
        // const obj = JSON.stringify({ "bill": props.id.toString(), "text": props.formText });
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "bill": props.id.toString(),
                "text": props.formText
            })
        }

       
        Auth.fetch('/api/comments/add_comment/', options).then((data) => {
            props.setFormText('');
            props.setUpdate(true);
        })
    };
    
    return (
        <form >
            <input
                className="form-item-comment"
                placeholder="Leave a comment"
                name="comment"
                type="text"
                value={props.formText}
                onChange={(e) => props.onChange(e)}
                required
            />
          
            <input
                className="form-submit-comment"
                value="SUBMIT"
                type="button"
                onClick={submit}
            />
        </form>

    );

}

