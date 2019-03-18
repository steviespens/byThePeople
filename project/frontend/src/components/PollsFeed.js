import React, { Component } from "react";
import PollsBox from './PollsBox';



export default class PollsFeed extends Component {

    render() {
        const title = "Polls";
        return (
            <div className="polls-feed">
                <PollsBox />
            </div>
        );
    }
};

