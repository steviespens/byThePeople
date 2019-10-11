//import React from 'react'; //this line I think could be here and not in each component
import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import MainFeed from "./components/MainFeed";
import HeaderBar from "./components/HeaderBar";
import News from "./components/News";
import Docket from "./components/Docket";
import UserPage from "./components/UserPage";
import UserBox from "./components/UserBox";


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';

import App from './components/App';
import Admin from './components/Admin';



// ReactDOM.render(<Home />, document.querySelector('#view'));
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about"
                render={(props) => <Home {...props} refreshRoute={"/about"}/>}
            />
            <Route exact path="/docket"
                render={(props) => <Home {...props} refreshRoute={"/docket"} />}
            />
            <Route exact path="/polls"
                render={(props) => <Home {...props} refreshRoute={"/polls"} />}
            />
            <Route exact path="/representatives"
                render={(props) => <Home {...props} refreshRoute={"/representatives"} />}
            />

            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
        </div>
    </Router>,
    document.getElementById('view'));
