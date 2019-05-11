import React, { Component } from "react";
import ReactDOM from "react-dom";
import AuthService from './AuthService';
import { useState, useEffect } from 'react';


export default function ProfileBox(props) {

    const Auth = new AuthService();
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('')
    const [politicalParty, setPoliticalParty] = useState('')
   
    useEffect(() => {
        Auth.fetch('api/get_user_metadata/').then((data) => {
            data = JSON.parse(data);
            setEmail(data.email);
            setGender(data.gender);
            setPoliticalParty(data.political_party);
        });
    }, [email, gender]);

    return (
        <div className="profile-box">
            <h5>{props.title}</h5>
            {email}
            <br></br>
            {gender}
            <br></br>
            {politicalParty}

        </div>

    );
    
};

