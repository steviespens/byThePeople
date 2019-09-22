import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Poll from "./Poll";
import PropTypes from "prop-types";
import TextField from '\@material-ui/core/TextField';
import { map } from "bluebird";
import { useState, useEffect, useRef } from 'react';
import AuthService from './AuthService';




const PollsRow = (props) => {
    const Auth = new AuthService();
    const [polls, setPolls] = useState(null);
    const ref = useRef(null);
    const [topic, setTopic] = useState(props.topic);
    useEffect(() => {
        if (sessionStorage.scrollPosition) {
            ref.current.scrollLeft = sessionStorage.scrollPosition;
        }
        Auth.fetch('api/polls/' + makeTopicParameter())
        .then((data) => {
            setPolls(data);
        });
        return () => {
            var scrollPosition = ref.current.scrollLeft;
            sessionStorage.setItem("scrollPosition", scrollPosition);
        }
    }, [props])
    const pollsList = () => {
        if (polls == null) return <div></div>
        return polls.map((el) => {
            return (
                <div key={el.id} className="poll-individual">
                    <Poll poll={el} />
                </div>
            );
        })
    }
    const makeTopicParameter = () => {
        if (!topic) return '';
        else return topic + '/';
    }
    return (
        <div className="polls-row-box">
            <h5>{props.title}</h5>

            <div className="polls-row" ref={ref}>
                {pollsList()}

            </div>
        </div>
        
    );

    
};

// PollsBox.propTypes = {
//     title: PropTypes.string.isRequired,
// };

export default PollsRow;




