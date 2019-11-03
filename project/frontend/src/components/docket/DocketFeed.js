import React, { useState, useEffect, useContext } from "react";
import { parseBillID } from '../utilities/helpers';
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';
import Bill from './Bill';
import AuthService from '../home/AuthService';
import { BillsContext } from '../home/Home';

export default function DocketFeed(props) {
    const Auth = new AuthService();
    const [bill, setBill] = useState(null);
    const [id, setID] = useState(null);
    const [list, setList] = useState([]);
    const context = useContext(BillsContext);
       
    useEffect(() => {
        setList(context);
        let tmpList = context;
        if (props.location.state && tmpList.length > 0) {
            const requestedBill = props.location.state.detail;
            let index = tmpList.findIndex((bill) => { return (bill.bill_id == requestedBill) });
            onClick(tmpList[index].id, tmpList[index].bill_id)
        }
    }, [props])
   
    const createList = () => {
        if (list == undefined || list.length == 0) {
            return [];
        }
        const l = list.map((el) => {
            return (
                <ListItem key={el.id} onClick={() => onClick(el.id, el.bill_id)} primary={el.short_title} secondary={el.bill_id}>
                </ListItem>
            );
        });
        return l;
    }

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
    
    return (
        <div className='docket-feed'>
            <List className='docket-feed-list'>
                {createList()}
            </List>
            <Bill className='bill' bill={bill}/>
        </div>
    );

};
