import React, { Component } from "react";
import PollsRow from './PollsRow';



export default class PollsFeed extends Component {

    render() {
        const title = "Polls";
        return (
            <div className="polls-feed">
                <PollsRow title='Recommended For You'topic='get_recommended_polls'/>

                <PollsRow title='Data Privacy'topic='Data Privacy'/>
                <PollsRow title='Health Care'topic = 'Health Care'/>


            </div>
        );
    }
};

