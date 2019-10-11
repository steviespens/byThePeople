import React, { useState, useEffect, useContext } from 'react';
import PollsRow from './PollsRow';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const PollsFeed = (props) => {

    const title = "Polls";
    const topics = [
        'Data Privacy',
        'Health Care',
        'Foreign Affairs',
        'Social Issues',
        'Environment',
        'General'
    ]
    const NUM_ADDL_POLLROWS = topics.length;

    const [selectedTopics, setSelectedTopics] = useState([]);
    useEffect(() => {
        if (selectedTopics.length == 0) {
            setSelectedTopics(randTopics(NUM_ADDL_POLLROWS));
                

        }
    })
    const randTopics = (n) => {
        var l = [];
        var j = 0;
        var tmpTopics = [...topics];
        var N = topics.length;
        while (n--) {
            j = Math.floor(Math.random() * (N));
            l.push(tmpTopics[j]);
            tmpTopics.splice(j, 1);
            N--;
        }
        return l;
    }
    const makePollRows = () => {
        return selectedTopics.map((t, index) => {
            return (
                <PollsRow
                    title={t}
                    topic={t}
                    // topics={topics}
                    // options={[t].concat(topics.filter((el) => !selectedTopics.includes(el)))}
                    // setSelectedTopics={(l) => setSelectedTopics(l)}
                />
            )
        })
    }
    return (
        <div className="polls-feed">
            <PollsRow title='Recommended For You' topic='get_recommended_polls' />
            {makePollRows()}



        </div>
    );
    

}
        
export default PollsFeed;