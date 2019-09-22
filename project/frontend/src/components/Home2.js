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
import RepresentativesFeed from "./RepresentativesFeed";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




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

import AuthService from './AuthService';
import withAuth from './withAuth';

// const Auth = Auth;

const menuBarWidth = 150;



export const AppContext = React.createContext();

class Home extends Component {
    // const { classes } = props;
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.onClick = this.onClick.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.state = {
            // poll: props.poll,
            selected: 'Home',
            reps: null
        };
    }
    onClick = (e) => {
        this.setState({
            selected: e
        });
    }
    handleLogout() {
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveStateToLocalStorage);
        this.hydrateStateWithLocalStorage();
        // this.Auth.fetch('reps/house/').then((data) => {
        //     this.setState({
        //         ...this.state,
        //         reps: data 
        //     })
        // });
        this.Auth.fetch_2('reps/house/', 'reps/senate/').then(([data1, data2]) => {
            let combined = data1.concat(data2);
            this.setState({
                ...this.state,
                reps: combined
            })
        })
    }
    componentWillUnmount() {
        this.saveStateToLocalStorage();
        window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
    }
    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            sessionStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {

            // if the key exists in localStorage
            if (sessionStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = sessionStorage.getItem(key);
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
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
            "Your Representatives": {
                'com': RepresentativesFeed,
                'className': 'representatives-feed'
            }

        };
        const Com = FEEDS[title]['com'];
        const className = FEEDS[title]['className'];
        return (
            <div className='root'>

                <MenuBar className='menu-bar' id='menu-bar' onClick={this.onClick} handleLogout={this.handleLogout.bind(this)} />
                <RepsContext.Provider value={this.state.reps}>
                    < Com className={className} />
                </RepsContext.Provider>
                {/* <MainFeed className='main-feed' /> */}
            </div>
        );
    }
};
// Home.contextType = AppContext;

export default withAuth(Home);
// App.propTypes = {
//     classes: PropTypes.object.isRequired,

// export default withStyles(styles)(App);

// const wrapper = document.getElementById("view");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
