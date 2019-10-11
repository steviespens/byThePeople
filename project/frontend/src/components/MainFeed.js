import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainFeedItem from "./MainFeedItem";
import DataProvider from "./DataProvider";
import Table from "./Table";
import NewsBox from "./NewsBox";
import DocketBox from "./DocketBox";
import PollsBox from "./PollsBox";
import SinglePollFeed from "./SinglePollFeed";
import ProfileBox from "./ProfileBox";




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
