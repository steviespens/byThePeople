import React, { Component } from "react";
import ReactDOM from "react-dom";
import AuthService from '../home/AuthService';
import { useState, useEffect } from 'react';
import SimpleMenu from '../reps/SimpleMenu';


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
           
            <h6>{props.title}</h6>
           
            
            <p>{email}</p>
            <p>{gender + ' | ' + politicalParty}</p>
            <SimpleMenu userMetadata={userMetadata}>

            </SimpleMenu>


        </div>

    );
    
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

