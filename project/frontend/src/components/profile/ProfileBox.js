import React from "react";
import AuthService from '../home/AuthService';
import { useState, useEffect } from 'react';
import SimpleMenu from './SimpleMenu';
import { isLoggedIn } from '../utilities/helpers';

export default function ProfileBox(props) {
    const Auth = new AuthService();
    const [email, setEmail] = useState('User is not logged in');
    const [gender, setGender] = useState(null);
    const [userMetadata, setUserMetadata] = useState(null);
    const [politicalParty, setPoliticalParty] = useState(null);
   
    useEffect(() => {
        if (!isLoggedIn()) return;
        Auth.fetch('api/get_user_metadata/').then((data) => {
            data = JSON.parse(data);
            setEmail(data.email);
            setGender(capitalizeFirstLetter(data.gender));
            setPoliticalParty(capitalizeFirstLetter(data.political_party));
            setUserMetadata(data);
        });
    }, [email, gender]);

    const makeSubLine = () => {
        return (gender == null || politicalParty == null) ? null : (<p>{gender + ' | ' + politicalParty}</p>);
    }

    return (
        <div className="profile-box" id='profile-box'>
            <h6>{props.title}</h6>
            <p>{email}</p>
            {makeSubLine()}
            <SimpleMenu userMetadata={userMetadata}></SimpleMenu>
        </div>
    );
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

