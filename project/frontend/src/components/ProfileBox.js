import React, { Component } from "react";
import ReactDOM from "react-dom";
import AuthService from './AuthService';
import { useState, useEffect } from 'react';
import SimpleMenu from './UIElements/SimpleMenu';


export default function ProfileBox(props) {

    const Auth = new AuthService();
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('')
    const [userMetadata, setUserMetadata] = useState(null);
    const [politicalParty, setPoliticalParty] = useState('')
   
    useEffect(() => {
        Auth.fetch('api/get_user_metadata/').then((data) => {
            data = JSON.parse(data);
            setEmail(data.email);
            setGender(capitalizeFirstLetter(data.gender));
            setPoliticalParty(capitalizeFirstLetter(data.political_party));
            setUserMetadata(data);
        });
    }, [email, gender]);
    
    const stateList = () => {

        <MenuItem onClick={handleClose}>Profile</MenuItem>

    }
    return (
        <div className="profile-box">
            <h5>{props.title}</h5>
            <h6>{email}</h6>
            <h6>{gender + ' | ' + politicalParty}</h6>
            <SimpleMenu userMetadata={userMetadata}>

            </SimpleMenu>

        </div>

    );
    
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

