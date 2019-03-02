import React, { Component } from "react";
import Docket from './Docket';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import DataProvider from './DataProvider';
import ListSubheader from '@material-ui/core/ListSubheader';



export default class DocketFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: null
        };
        this.getBills = this.getBills.bind(this);

    }

    getBills = (data) => {
        console.log(data);
        return data.map((el) => {
            
            return (
                <ListItem button>
                    <ListItemText primary={el.description} />
                </ListItem>
            );
        });
    }

    render() {
        const subheader = "Policy Docket";
        const getBills = this.getBills;
        return (
            <div className="main-feed">
                <Paper>
                    <List>
                        <ListSubheader>{subheader}</ListSubheader>
                        <Divider/>
                        <DataProvider endpoint="api/upcomingbill" render={getBills}/>
                    </List>
                </Paper>
            </div>
        );
    }


    // render() {
     
    //     const Com = FEEDS[title]['com'];
    //     const className = FEEDS[title]['className'];
    //     return (
    //         <div className='root'>

    //             <MenuBar className='menu-bar' onClick={this.onClick} />
    //             < Com className={className} />
    //         </div>
    //     );
    // }
};
