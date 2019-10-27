import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainFeedItem from "../unused/MainFeedItem";
import DataProvider from "../unused/DataProvider";
import Table from "../unused/Table";
import NewsBox from "../news/NewsBox";
import DocketBox from "../docket/DocketBox";
import PollsBox from "../polls/PollsBox";
import SinglePollFeed from "../polls/SinglePollFeed";
import ProfileBox from "../profile/ProfileBox";




export default class MainFeed extends Component {

    render() {
        return (
            <div className="main-feed">
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

// const wrapper = document.getElementById("main-feed"); 
// export default MainFeed;
// wrapper ? ReactDOM.render(<MainFeed />, wrapper) : null;
