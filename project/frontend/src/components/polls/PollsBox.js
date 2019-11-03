import React from "react";
import { useState, useEffect, useRef } from 'react';
import AuthService from '../home/AuthService';
import PollsRow from './PollsRow';

const PollsBox = (props) => {
    const Auth = new AuthService();
    const ref = useRef(null);

    useEffect(() => {
        if (sessionStorage.scrollPosition) {
            ref.current.scrollLeft = sessionStorage.scrollPosition;
        }
        return () => {
            var scrollPosition = ref.current.scrollLeft;
            sessionStorage.setItem("scrollPosition", scrollPosition);
        }
    }, [props])
    
    return (
        <div className="polls-box" ref={ref} id="polls-box">
            <h5>{props.title}</h5>
            <PollsRow title='Recommended For You' topic='get_recommended_polls' />            
        </div>
    );
};

export default PollsBox;




