import React from "react";
import { useState, useEffect } from 'react';
import AuthService from '../home/AuthService';
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';

const NewsBox = (props) => {
    const Auth = new AuthService();
    const [headlines, setHeadlines] = useState(null);
    
    useEffect(() => {
        Auth.fetch('api/headline/').then((data) => {
            setHeadlines(data.reverse());
        });
    }, [props])

    const headlineList = () => {
        if (!headlines) return (<div></div>);
        return headlines.map((h, index) => {
            return (
                <ListItem key={index}>
                    <a href={h.url} target="_blank" key={index}>
                        <p className='headline-item'>
                        {h.title}
                        </p>
                    </a >
                </ListItem >
            );
        });
    }

    return (
        <div className="news-box">
            <h5>{props.title}</h5>
            <List>
                {headlines != null ? headlineList() : <div></div>}
            </List>
        </div>
    )
};

export default NewsBox;

