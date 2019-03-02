import React, { Component } from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import MainFeed from "./MainFeed";
import MenuBar from "./MenuBar";
import AboutFeed from "./AboutFeed";
import DocketFeed from "./DocketFeed";
import PollsFeed from "./PollsFeed";
import NewsFeed from "./NewsFeed";



import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import color from "@material-ui/core/colors/teal";




const menuBarWidth = 150;

//styles don't do anything
const styles = () => ({
    root: {
        display: 'flex',
    },
    mainFeed: {
        width: `calc(100% - ${menuBarWidth}px)`,
        marginLeft: menuBarWidth,
    },
    menuBar: {
        width: menuBarWidth,
        flexShrink: 0,
    },
    // mainFeedPaper: {
    //     width: mainFeedWidth,
    // },
    // toolbar: theme.mixins.toolbar,
    // content: {
    //     flexGrow: 1,
    //     backgroundColor: theme.palette.background.default,
    //     padding: theme.spacing.unit * 3,
    // },
});


export default class App extends Component {
    // const { classes } = props;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            // poll: props.poll,
            selected: 'Home'
        };
    }
    onClick = (e) => {
        this.setState({
            selected: e
        });
    }
  

    render() {
        const title = this.state.selected;
        const FEEDS = {
            "Home": {
                'com': MainFeed,
                'className': 'menu-bar'
            },
            "About": {
                'com': AboutFeed,
                'className': 'about-feed'
            },
            "Docket": {
                'com': DocketFeed,
                'className': 'docket-feed'
            },
            "Polls": {
                'com': PollsFeed,
                'className': 'polls-feed'
            },
            "News": {
                'com': NewsFeed,
                'className': 'news-feed'
            }
        };
        const Com = FEEDS[title]['com'];
        const className = FEEDS[title]['className'];
        // console.log(FEEDS[title.com]);
        return (
            <div className='root'>

                <MenuBar className='menu-bar' onClick={this.onClick} />
                < Com className={className}/>
                {/* <MainFeed className='main-feed' /> */}
            </div>
        );
    }
};

// App.propTypes = {
//     classes: PropTypes.object.isRequired,

// export default withStyles(styles)(App);

// const wrapper = document.getElementById("view");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
