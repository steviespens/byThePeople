import React, { Component, useState, useEffect, useContext } from "react";
import Docket from './Docket';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import DataProvider from '../unused/DataProvider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Bill from './Bill';
import { parseBillID } from '../utilities/helpers';
import AuthService from '../home/AuthService';
import List from '../UIElements/List';
import Poll from '../polls/Poll';
import { BillsContext } from '../home/Home';
import ListItem from '../UIElements/ListItem';
import { makeStyles } from '@material-ui/styles';



export default function DocketFeed(props) {
    const [bill, setBill] = useState(null);
    const [id, setID] = useState(null);
    const [list, setList] = useState([]);
    const context = useContext(BillsContext);

    /*api_uri: "https://api.propublica.org/congress/v1/116/bills/hr1063.json"
    bill_id: "hr1063-116"
    bill_url: "http://docs.house.gov/billsthisweek/20190211/BILLS-116hr1063-SUS.pdf"
    chamber: "house"
    description: "Presidential Library Donation Reform Act of 2019"
    id: 1
    legislative_day: "2019-02-11"
    related_polls: [7]
    scheduled_at: "2019-02-08T15:46:19-05:00"
    url: "http://docs.house.gov/floor/Default.aspx?date=2019-02-11"*/
    const Auth = new AuthService();
        // this.onClick = this.onClick.bind(this);
        // this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
        // this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        // this.createList = this.createList.bind(this);
    useEffect(() => {
        // hydrateStateWithLocalStorage();
        // doesnt check if list not null
        setList(context);
        let tmpList = context;
        if (props.location.state && tmpList.length > 0) {
            const requestedBill = props.location.state.detail;
            let index = tmpList.findIndex((bill) => { return (bill.bill_id == requestedBill) });
            onClick(tmpList[index].id, tmpList[index].bill_id)
        }
        // Auth.fetch('api/upcomingbill/').then((data) => {
        //     setList(data);
        // });
        return () => {
            // saveStateToLocalStorage();
        }
    }, )
    // componentDidMount() {
    //     this.hydrateStateWithLocalStorage();
    //     if (this.props.location.state) {
    //         const reqBill = this.props.location.state.detail;
    //         console.log(reqBill);
    //     }
        
    //     this.Auth.fetch('api/upcomingbill/').then((data) => {
    //         this.setState({ list: data })
    //     });
    // }
    const createList = () => {
        if (list == undefined || list.length == 0) {
            return [];
        }
        const x = list.map((el) => {
            return (
                <ListItem key={el.id} onClick={() => onClick(el.id, el.bill_id)} primary={el.short_title} secondary={el.bill_id}>
                </ListItem>
            );

            // return (
            //     <ListItem button key={el.id} onClick={() => onClick(el.id, el.bill_id)}>
            //         <ListItemText primary={el.short_title} secondary={el.bill_id} />
            //     </ListItem>
            // );
        });
        return x;
    }
    // componentWillUnmount() {
    //     this.saveStateToLocalStorage();
    // }
    //CHANGING THIS
    // const onClick = (id, bill_id) => {
    //     const bill = parseBillID(bill_id);
    //     Auth.fetch('api/jsonfiles/' + bill.prefix + '/' + bill.billNumber + '/' + bill.congressNumber + '/').then((bill) => {
    //         setBill(bill);
    //         setID(id);
    //         // this.setState({
    //         //     bill: bill,
    //         //     id: id
    //         // });
    //     });
    // }
    //in theory should use a GET request but using a POST is just way easier than url parameterization. but doesnt really matter, packages exist to parse url params like json. you can abstract it all away. url params are also perhaps a bit more insecure, tho for something like a billID it doesnt matter
    const onClick = (id, bill_id) => {
        setID(id);

        const bill = parseBillID(bill_id);
        const congress_num = bill.congressNumber;
        const bill_num = bill.prefix + bill.billNumber;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                congress_num,
                bill_num
            })
        }
        
        Auth.fetch('api/jsonfiles/get_bill_data/', options).then((response) => {
            const bill = JSON.parse(response).results[0]
            setBill(bill);
        });
    }

    
    //          //DIDNT FIX THESE FOR functional component (was class component before)
    // function saveStateToLocalStorage() {
    //     // for every item in React state
    //     for (let key in this.state) {
    //         // save to localStorage
    //         sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    //     }
    // }

    // function hydrateStateWithLocalStorage() {
    //     // for all items in state
    //     for (let key in this.state) {

    //         // if the key exists in localStorage
    //         if (sessionStorage.hasOwnProperty(key)) {
    //             // get the key's value from localStorage
    //             let value = sessionStorage.getItem(key);
    //             // console.log(value)
    //             // parse the localStorage string and setState
    //             try {
    //                 value = JSON.parse(value);
    //                 this.setState({ [key]: value });
    //                 // console.log({[key]:value})
    //             } catch (e) {
    //                 // handle empty string
    //                 this.setState({ [key]: value });
    //             }
    //         }
    //     }
    // }
    const subheader = "Policy Docket";
    return (
        <div className='docket-feed'>
            <List className='docket-feed-list'>
                {createList()}
            </List>
            <Bill className='bill' bill={bill}/>
        </div>
    );

};
