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
import Bill from './Bill';
import { parseBillID } from './utilities/helpers';




export default class DocketFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: null
        };
        this.getBills = this.getBills.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    componentDidMount() {
        // console.log('mounted');
    }
    componentWillUnmount() {
        // console.log('unmounting');
    }

    //format: hr525-116
    onClick = (bill_id) => {
        const bill = parseBillID(bill_id);
        fetch('api/jsonfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((response) => {
            return response.json();
        }).then((bill) => {
            this.setState({ bill: bill});
        });
    }

    getBills = (data) => {
        return data.map((el) => {
            return (
                <ListItem button key={el.bill_id} onClick={() => this.onClick(el.bill_id)}>
                    <ListItemText primary={el.description} secondary={el.bill_id}/>
                </ListItem>
            );
        });
    }
    //onclick, do a fetch of the url i want
    //the url should return the json response
    //then I know what to do, so I all I need is what should url be
    //will be in 
    render() {
        const subheader = "Policy Docket";
        const getBills = this.getBills;
        return (
            <div className='big-docket-feed'>
                <div className="docket-feed">
                    <Paper>
                        <List>
                            <ListSubheader>{subheader}</ListSubheader>
                            <Divider />
                            <DataProvider endpoint="api/upcomingbill" render={getBills} />
                        </List>
                    </Paper>
                </div>
                <Bill className='bill' bill={this.state.bill} />
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
