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
                <div className="eight columns">
                    <div className="row">
                        <div className="four columns">
                            <ProfileBox title="Profile" />
                        </div>
                        <div className="eight columns">
                            <DocketBox title="Docket" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="twelve columns">
                            <SinglePollFeed title="Poll of the Day" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="seven columns">
                            <MainFeedItem title="Trending Discussion" />
                        </div>
                        <div className="five columns">
                            <PollsBox title="Recent Polls" />
                        </div>
                    </div>
                </div>
                <div className="four columns">
                    <NewsBox title="Top News" />
                </div>

            </div>
        );
    }
};

// const wrapper = document.getElementById("main-feed"); 
// export default MainFeed;
// wrapper ? ReactDOM.render(<MainFeed />, wrapper) : null;
