import React, { useState, useEffect } from 'react';
import PollsRow from './PollsRow';

const PollsFeed = (props) => {

    const topics = [
        'Data Privacy',
        'Health Care',
        'Foreign Affairs',
        'Social Issues',
        'Environment',
        'General'
    ]

    const NUM_ADDL_POLLROWS = topics.length;

    //change line below to allow user to set the order of topics in PollsFeed
    const [selectedTopics, setSelectedTopics] = useState([]);

    useEffect(() => {
        if (selectedTopics.length == 0) {
            setSelectedTopics(randTopics(NUM_ADDL_POLLROWS));
        }
    })

    //returns list of topics in random order
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
                    key={index}
                    title={t}
                    topic={t}
                />
            )
        })
    }

    return (
        <div className="polls-feed" id='polls-feed'>
            <PollsRow title='Recommended For You' topic='get_recommended_polls' />
            {makePollRows()}
        </div>
    );
}
        
export default PollsFeed;