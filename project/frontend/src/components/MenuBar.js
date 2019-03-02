import React, { Component } from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import MenuBarItem from "./MenuBarItem";
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';



export default class MenuBar extends Component {
   
    constructor(props) {
        super(props);
        // this.onClick = this.onClick.bind(this);
       
        // this.state = {
        //     // poll: props.poll,
        //     selected: "Home"
        // };
    }
    // onClick = () => {
    //     this.setState({
    //         selected: 
    //     })
    // };

    
    render() {
        const onClick = this.props.onClick;
        const titles = ["Home", "About", "Docket", "Polls", "News"];
        const listItems = titles.map(title =>
            <ListItem button id={title} value={title} onClick={() => onClick(title)} key={title}>
                <ListItemText primary={title} />
            </ListItem>);
        return (
            <List
                component="ul"
                className="menu-bar">
                {listItems}
            </List>
        );
    }
};

// export default MenuBar;
//gets the wrapper div from templates/frontend/index.html 
// const wrapper = document.getElementById("menu-bar");
// //calls ReactDOM.render with the App and wrapper arguments
// wrapper ? ReactDOM.render(<MenuBar />, wrapper) : null;
