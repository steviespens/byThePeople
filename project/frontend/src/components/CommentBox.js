import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";


export default function CommentBox(props) {

    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male')
    const [politicalParty, setPoliticalParty] = useState('independent')
   
    useEffect(() => {
        return


    });
    

    return (
        <div >
           
            <CommentList />
            <CommentForm />
        </div>

    );

}

