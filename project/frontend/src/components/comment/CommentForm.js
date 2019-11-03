import React, { Component } from "react";
import { useState, useEffect } from 'react';
import AuthService from '../home/AuthService';
import { isLoggedIn } from '../utilities/helpers';


export default function CommentForm(props) {

    const Auth = new AuthService();
    const [id, setId] = useState(props.id);
   

    useEffect(() => {
        props.setFormText('');
    }, [props.id]);


    const submit = () => {
        if (!isLoggedIn()) {
            alert('Please create an account to leave a commment')
            return
        };

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

