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

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SimpleListMenu from './UIElements/SimpleListMenu';


const PollsRow = (props) => {
    const Auth = new AuthService();
    const [polls, setPolls] = useState(null);
    const ref = useRef(null);
    const [topic, setTopic] = useState(props.topic);
    useEffect(() => {

        if (sessionStorage.scrollPosition) {
            ref.current.scrollLeft = sessionStorage.scrollPosition;
        }
        // if (topic == 'get_recommended_polls') {
        //     const url = 'api/polls/get_recommended_polls/';
        //     const options = { method: 'GET' };
        // } else {
        //     const url = 'api/polls/get_topic/';
        //     const options = {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             'topic': makeTopicParameter()
        //         })
        //     };
        // }
        const u = topic == 'get_recommended_polls' ? 'api/polllist/get_recommended_polls/' : 'api/polllist/get_topic/';
        const o = topic == 'get_recommended_polls' ? { method: 'GET' } : {
            method: 'POST',
            body: JSON.stringify({
                'topic': makeTopicParameter()
            })
        };
        Auth.fetch(u, o)
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
        else return topic;
    }
    return (
        <div className="polls-row-box">
            <h5>{props.title}</h5>
            {/* <button>{props.title}</button> */}
            {/* {props.options != null ? 
                <SimpleListMenu
                    options={props.options}
                    setSelectedTopic={(t) => {
                        //seems like there could be a better way to do this
                        props.setSelectedTopics(
                            [t].concat(props.topics.filter((el) => {
                                return props.options.includes(el);
                            }))
                        )

                    }

                        }
                ></SimpleListMenu>
                : <h5>{props.title}</h5>
            } */}


            <div className="polls-row" ref={ref}>
                {pollsList()}

            </div>
        </div>
        
    );

    
};


export default PollsRow;




