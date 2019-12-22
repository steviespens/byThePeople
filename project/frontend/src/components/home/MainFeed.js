import React, { Component } from "react";
import NewsBox from "../news/NewsBox";
import DocketBox from "../docket/DocketBox";
import PollsBox from "../polls/PollsBox";
import ProfileBox from "../profile/ProfileBox";


export default class MainFeed extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-feed" id='main-feed'>
                <div className="main-feed-row-top">
                    <ProfileBox title="Profile" />
                    <DocketBox title="Docket" />
                    <NewsBox title="Top News" />
                </div>
                
                <div className="main-feed-row-bottom">
                    <PollsBox />
                </div>
            </div>
        );
    }
};
