import React, {useContext} from "react";
import {withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';
import {BillsContext } from '../home/Home';

const DocketBox = (props) => {

    const context = useContext(BillsContext);
    const bills = context;

    const onClick = (bill) => {
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
        </div>
    )
};

DocketBox.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withRouter(DocketBox)
