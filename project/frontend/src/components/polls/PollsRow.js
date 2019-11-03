import React from "react";
import { useState, useEffect, useRef } from 'react';
import Poll from "./Poll";
import AuthService from '../home/AuthService';


const PollsRow = (props) => {
    const Auth = new AuthService();
    const [polls, setPolls] = useState(null);
    const ref = useRef(null);
    const [topic, setTopic] = useState(props.topic);

    useEffect(() => {
        if (sessionStorage.scrollPosition) {
            ref.current.scrollLeft = sessionStorage.scrollPosition;
        }
        const urlToGet = topic == 'get_recommended_polls' ? 'api/polllist/get_recommended_polls/' : 'api/polllist/get_topic/';
        const options = topic == 'get_recommended_polls' ? { method: 'GET' } : {
            method: 'POST',
            body: JSON.stringify({
                'topic': makeTopicParameter()
            })
        };
        Auth.fetch(urlToGet, options)
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
            <div className="polls-row" ref={ref}>
                {pollsList()}
            </div>
        </div>
    );
};

export default PollsRow;




