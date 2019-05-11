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
            // <div>hey</div>
            <div className="row main-feed">
                <div className="twelve columns">
                    <div className="row" id="main-feed-first-row">
                        <div className="two columns" id="main-feed-first-row-box">
                            <ProfileBox title="Profile" />
                        </div>
                        <div className="six columns" id="main-feed-first-row-box">
                            <DocketBox title="Docket" />
                        </div>
                        <div className="four columns" id="main-feed-first-row-box">
                            <NewsBox title="Top News" />
                        </div>

                    </div>
                    {/* <div className="row">
                        <div className="twelve columns">
                            <SinglePollFeed title="Poll of the Day" />
                        </div>
                    </div> */}
                    <div className="row">
                        {/* <div className="seven columns">
                            <MainFeedItem title="Trending Discussion" />
                        </div> */}
                        <div className="twelve columns">
                            <PollsBox title="Recent Polls" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
};

// const wrapper = document.getElementById("main-feed"); 
// export default MainFeed;
// wrapper ? ReactDOM.render(<MainFeed />, wrapper) : null;
