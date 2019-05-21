import React, { Component } from "react";
import Docket from './Docket';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import DataProvider from './DataProvider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Bill from './Bill';
import { parseBillID } from './utilities/helpers';
import AuthService from './AuthService';
import List from './UIElements/List';
import Poll from './Poll';





export default class DocketFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: null,
            id: null,
            list: []
        };
        this.Auth = new AuthService();
        this.getBills = this.getBills.bind(this);
        this.onClick = this.onClick.bind(this);
        // this.getRelatedPolls = this.getRelatedPolls.bind(this);
    }
    componentDidMount() {
        this.Auth.fetch('api/upcomingbill/').then((data) => {
            const x = data.map((el) => {
                return (
                    <ListItem button key={el.id} onClick={() => this.onClick(el.id, el.bill_id)}>
                        <ListItemText primary={el.description} secondary={el.bill_id} />
                    </ListItem>
                );
            });
            this.setState({ list: x });
        });
    }
    componentWillUnmount() {
        // console.log('unmounting');
    }

    // getRelatedPolls = () => {
    //     this.Auth('api/upcomingbill/get_related_polls').then((data) => {
            
    //     })
    // }
    onClick = (id, bill_id) => {
        const bill = parseBillID(bill_id);
        this.Auth.fetch('api/jsonfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((bill) => {
           
            this.setState({
                bill: bill,
                id: id
            });
        });
    }


    getBills = (data) => {
        return data.map((el) => {
            return (
                <ListItem button key={el.id} onClick={() => this.onClick(el.id, el.bill_id)}>
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
        // const getBills = this.getBills;
        return (
            <div className='docket-feed'>
                {/* <h6>{subheader}</h6> */}
                <List className='docket-feed-list'>
                    {this.state.list}
                </List>
                <Bill className='bill' bill={this.state.bill} id={this.state.id} />

                
            </div>

        );
    }


    

};
