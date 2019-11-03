import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./components/home/Home";
import HeaderBar from "./components/home/HeaderBar";
import Login from './components/unused/Login';
import Admin from './components/admin/Admin';


//using top level component <Home> instead of <App>
ReactDOM.render(

    <React.Fragment>
    
        <Router>

            <HeaderBar></HeaderBar>

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
            <Route exact path="/register" component={Login} />
            <Route exact path="/admin" component={Admin} />
        
        </Router>

    </React.Fragment>, document.getElementById('view'));
