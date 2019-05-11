import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AuthService from './AuthService';


export default function CommentForm(props) {

    const [id, setId] = useState(props.id);
    const Auth = new AuthService();
   
    useEffect(() => {
        props.setFormText('');
    }, [props.id]);

    const submit = () => {
        const obj = JSON.stringify({ "bill": props.id.toString(), "text": props.formText });
        Auth.fetch('/comments/add_comment/' + obj + '/', { method: 'POST' }).then((data) => {
            props.setFormText('');
            props.setUpdate(true);
        })
    };
    
    return (
        <form >
            <input
                className="form-item"
                placeholder="Write your comment here"
                name="comment"
                type="text"
                value={props.formText}
                onChange={(e) => props.onChange(e)}
                required
            />
            <br></br>
            <input
                className="form-submit"
                value="SUBMIT"
                type="button"
                onClick={submit}
            />
        </form>

    );

}

