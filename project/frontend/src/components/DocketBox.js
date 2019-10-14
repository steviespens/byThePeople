import React, {useEffect, useState, useContext} from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Table from "./Table";
import TableAll from "./TableAll";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import AuthService from "./AuthService";
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from './UIElements/List';
import ListItem from './UIElements/ListItem';
import {withRouter} from 'react-router-dom';
import {BillsContext } from './Home';

const DocketBox = (props) => {
    const context = useContext(BillsContext);
    const bills = context;
    // const [bills, setBills] = useState(null);
    const Auth = new AuthService();

    //could also use the context object directly and have it set immediately
    useEffect(() => {
        // Auth.fetch('api/upcomingbill/').then((data) => {
        //     setBills(data);
        // })
    }, [props])
    const onClick = (bill) => {
        // console.log(bill)
        props.history.push({
            pathname: '/docket',
            state: {detail: bill}
        })
    }
    const billList = () => {
        if (!bills) return (<div></div>);
        return bills.map((bill, index) => {
            return (
                <ListItem button id={index} value={bill.bill_id} onClick={() => onClick(bill.bill_id)} key={index} primary={bill.title}>
                    {/* <ListItemText primary={bill.title} /> */}
                </ListItem >
            );
        }
    );
        
    }
    return (
        <div className="docket-box">
            
            <h5>{props.title}</h5>
            
            <List>
                {billList()}
            </List>
            {/* <DataProvider endpoint="api/upcomingbill/"
                render={data => <TableAll data={data.reverse()} fields={fields} />} /> */}
        </div>
    )
};

DocketBox.propTypes = {
    title: PropTypes.string.isRequired,
};

// export default DocketBox;
export default withRouter(DocketBox)
