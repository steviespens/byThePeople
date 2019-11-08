import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainFeed from "./MainFeed";
import MenuBar from "./MenuBar";
import AboutFeed from "../about/AboutFeed";
import DocketFeed from "../docket/DocketFeed";
import PollsFeed from "../polls/PollsFeed";
import RepresentativesFeed from "../reps/RepresentativesFeed";
import AuthService from './AuthService';
import withAuth from './withAuth';

export const RepsContext = React.createContext();
export const BillsContext = React.createContext();

class Home extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.onClick = this.onClick.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.state = {
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

        this.Auth.fetch_3(
            'reps/house/',
            'reps/senate/',
            'api/upcomingbill/get_recent_bills/')
            .then(([data1, data2, data3]) => {

                let combined = data1.concat(data2);
                this.setState({
                    ...this.state,
                    reps: combined,
                    bills: data3
                })
            })
    }

    componentWillUnmount() {
        this.saveStateToLocalStorage();
        window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
        }
        
    render() {
        return (
            <div className='root' id='root-div'>
                <Router>
                    <MenuBar className='menu-bar' id='menu-bar' onClick={this.onClick} handleLogout={this.handleLogout.bind(this)} />
                    <BillsContext.Provider value={this.state.bills}>
                        <RepsContext.Provider value={this.state.reps}>
                            <Route exact path="/" component={MainFeed} />
                            <Route path="/about" component={AboutFeed} />
                            <Route path="/docket" component={DocketFeed} />
                            <Route path="/polls" component={PollsFeed} />
                            <Route path="/representatives" component={RepresentativesFeed} />
                        </RepsContext.Provider>
                    </BillsContext.Provider>
                </Router>
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

export default withAuth(Home);
