import React, { Component } from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "../unused/DataProvider";
import Table from "../unused/Table";
import MainFeed from "./MainFeed";
import MenuBar from "./MenuBar";
import AboutFeed from "../about/AboutFeed";
import DocketFeed from "../docket/DocketFeed";
import PollsFeed from "../polls/PollsFeed";
import NewsFeed from "../unused/NewsFeed";
import RepresentativesFeed from "../reps/RepresentativesFeed";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';

// const Auth = Auth;

const menuBarWidth = 150;



export const RepsContext = React.createContext();
export const BillsContext = React.createContext();
// export const HistoryContext = React.createContext();
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
            reps: null,
            bills: null
        };
    }
    onClick = (e) => {
        this.setState({
            selected: e
        });
    }
    handleLogout() {
        this.Auth.logout()
        this.props.history.replace('/register');
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

        this.Auth.fetch_3('reps/house/', 'reps/senate/', 'api/upcomingbill/get_recent_bills/').then(([data1, data2, data3]) => {
            // console.log(data2)

            let combined = data1.concat(data2);
            this.setState({
                ...this.state,
                reps: combined,
                bills: data3
            })
        })

        //LINE BELOW IS A WORKAROUND TO ALLOW REFRESH ON CLIENT-SIDE DOMAINS, BUT IT CHANGES THE FIRST PART OF THE URL SO THAT FETCH CALLS DON'T WORK. COULD FIX BY WIRING IN AN EXTRA URL 
        // if (this.props.refreshRoute) {
        //     this.props.history.replace(this.props.refreshRoute);
        // }


    }
    // componentDidUpdate() {
    //     if (this.state.reps == null) {
    //         console.log('going to update')
    //         this.Auth.fetch_3('reps/house/', 'reps/senate/', 'api/upcomingbill/get_recent_bills/').then(([data1, data2, data3]) => {
    //             let combined = data1.concat(data2);
    //             this.setState({
    //                 ...this.state,
    //                 reps: combined,
    //                 bills: data3
    //             })
    //         })

    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps != this.props || nextState != this.state || this.state.reps == null) {
    //         return true;
    //     }
    //     return false;
    // }

    componentWillUnmount() {
        this.saveStateToLocalStorage();
        window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
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
            "Representatives": {
                'com': RepresentativesFeed,
                'className': 'representatives-feed'
            }

        };
        const Com = FEEDS[title]['com'];
        const className = FEEDS[title]['className'];
        return (
            <div className='root' id='root-div'>
                <Router>
                    <MenuBar className='menu-bar' id='menu-bar' onClick={this.onClick} handleLogout={this.handleLogout.bind(this)} />
                    <BillsContext.Provider value={this.state.bills}>
                        <RepsContext.Provider value={this.state.reps}>

                            {/* < Com className={className} /> */}
                            <Route exact path="/" component={MainFeed} />
                            <Route path="/about" component={AboutFeed} />
                            <Route path="/docket" component={DocketFeed} />
                            <Route path="/polls" component={PollsFeed} />
                            <Route path="/representatives" component={RepresentativesFeed} />
                            {/* <Route path="/docket/:id" component={DocketFeed} /> */}
                        </RepsContext.Provider>
                    </BillsContext.Provider>


                </Router>
                {/* <MenuBar className='menu-bar' id='menu-bar' onClick={this.onClick} handleLogout={this.handleLogout.bind(this)} />
                <RepsContext.Provider value={this.state.reps}>
                    < Com className={className} />
                </RepsContext.Provider> */}
                {/* <MainFeed className='main-feed' /> */}
            </div>
        );
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


};
// Home.contextType = { reps: RepsContext, bills: BillsContext }

export default withAuth(Home);
// App.propTypes = {
//     classes: PropTypes.object.isRequired,

// export default withStyles(styles)(App);

// const wrapper = document.getElementById("view");
// wrapper ? ReactDOM.render(<App />, wrapper) : null;
