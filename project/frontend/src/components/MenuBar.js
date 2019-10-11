import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import MenuBarItem from "./MenuBarItem";
import { withStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MainFeedList from './UIElements/MainFeedList';
import ListItem from './UIElements/ListItem';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter as Router, Route, Link, WrappedLink } from "react-router-dom";


export default function MenuBar(props) {
   
  
    
    // const onClick = props.onClick;
    const onClick = () => { return };
    const titles = ["Home", "About", "Docket", "Polls", "Representatives"];
    const links = ['/', '/about', '/docket', '/polls', '/representatives']
    // const listItems = titles.map(title =>
    //     <ListItem button id={title} value={title} onClick={() => onClick(title)} key={title}>
    //         <ListItemText primary={title} />
    //     </ListItem>);
    // const listItems = titles.map((title, index) => {
    //     return (<Tab key={index} value={index} label={title} containerElement={<Link to={links[index]} />} />);
    // });
    const linkList = titles.map((title, index) => {
      
        return (<Link className="link" to={links[index]}>
            <ListItem id={title} value={title} onClick={() => onClick(title)} key={title}>
                
            </ListItem>


        </Link>)
        // return (<a className="link" href={'/'+title.toLowerCase()}>
        //     <ListItem id={title} value={title} onClick={() => onClick(title)} key={title}>

        //     </ListItem>


        // </a>)

    })
    const [value, setValue] = useState(0);

    return (
        <MainFeedList className="menu-bar">
            {linkList}

            <button type="button" className="logout-button" onClick={props.handleLogout}>Logout</button>

        </MainFeedList>
    );
}


// export default MenuBar;
//gets the wrapper div from templates/frontend/index.html 
// const wrapper = document.getElementById("menu-bar");
// //calls ReactDOM.render with the App and wrapper arguments
// wrapper ? ReactDOM.render(<MenuBar />, wrapper) : null;
