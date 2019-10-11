import React from "react";
import { useState, useEffect } from 'react';
import AuthService from './AuthService';

import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import TableAll from "./TableAll";
import PropTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from './UIElements/List';


const NewsBox = (props) => {
    const fields = ['title'];
    const Auth = new AuthService();
    const [headlines, setHeadlines] = useState(null);
    useEffect(() => {
        Auth.fetch('api/headline/').then((data) => {
            setHeadlines(data.reverse());
        });
    }, [props])
    const onClick = () => {

    }
    const headlineList = () => {
        if (!headlines) return (<div></div>);
        return headlines.map((h, index) => {
            return (
                <ListItem button component="a" href={h.url} target="_blank" id={index} value={h.description} onClick={() => onClick()} key={index}>
                    <ListItemText primary={h.title} />
                </ListItem >
            );
        });
    }

    return (
        <div className="news-box">
            
            <h5>{props.title}</h5>

           
            {/* {headlines != null ? <TableAll data={headlines} fields={fields}/> : <div></div>} */}
            <List>
                {headlines != null ? headlineList() : <div></div>}

            </List>
        </div>
    )
};

// NewsBox.propTypes = {
//     title: PropTypes.string.isRequired,
// };

export default NewsBox;

