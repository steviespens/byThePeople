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

import PollsRow from './PollsRow';



const PollsBox = (props) => {
    const Auth = new AuthService();
    const [polls, setPolls] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        if (sessionStorage.scrollPosition) {
            ref.current.scrollLeft = sessionStorage.scrollPosition;
        }
        Auth.fetch('api/polls/').then((data) => {
            setPolls(data);
        });
        return () => {
            var scrollPosition = ref.current.scrollLeft;
            sessionStorage.setItem("scrollPosition", scrollPosition);
        }
    },[props])
    // const pollsList = () => {
    //     if (polls == null) return <div></div>
    //     return polls.map((el) => {
    //         return (
    //             <div key={el.id} id="poll-individual">
    //                 <Poll poll={el} />
    //             </div>
    //         );
    //     })
    // }
    return (
        <div className="polls-box" ref={ref} id="polls-box">
            <h5>{props.title}</h5>
            {/* {pollsList()} */}
            <PollsRow title='Recommended For You' topic='get_recommended_polls' />

            
        </div>
    );
};

// PollsBox.propTypes = {
//     title: PropTypes.string.isRequired,
// };

export default PollsBox;




