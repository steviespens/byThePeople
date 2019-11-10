import React, { useState, useEffect } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles, createStyles } from '@material-ui/styles';

import { parseBillID } from '../utilities/helpers';
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';
import AuthService from '../home/AuthService';
import Bill from '../docket/Bill';


const SingleRepBills = (props) => {
    const { rep } = props;
    const Auth = new AuthService();
    const [bills, setBills] = useState(null)
    const [bill, setBill] = useState(null);
    const [bill_id, setBillID] = useState(null);
    const [open, setOpen] = useState(false);
    const id = rep.member.identifier;

    const options = {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    }

    useEffect(() => {
        let isSubscribed = true
        Auth.fetch('reps/member/get_bills_by_member_by_id/', options).then((data) => {
            if (isSubscribed) {
                setBills(data);
            }
        })
        return () => isSubscribed = false

    }, [props])

    const onClick = (bill_id) => {
        setBillID(bill_id);
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
        }).then(() => {
            setOpen(true);
        });

    }

    const makeBills = () => {
        return bills.map((el, index) => {
            return (
                <ListItem key={index} onClick={() => onClick(el.bill_id)} primary={el.short_title} secondary={el.bill_id}>
                </ListItem>
            );
        });
    }

    return (
        <div className="single-rep-bills">
            {bills == null ? <div></div> : (
                <React.Fragment>

                    <h6>Recent Authored Bills</h6>
                    <List>
                        {makeBills()}
                    </List>
                    <Dialog 
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <DialogContent className={props.classes.dialogContent}>
                            <Bill className='bill' bill={bill} />
                        </DialogContent>
                    </Dialog>

                </React.Fragment>
            )}
        </div>
    );
};

const styles = createStyles({
    root: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: '80vw',
        maxWidth: '80vw',
    },
    dialog: {
        maxHeight: '100vh',
        maxWidth: '100vw',
    },
    dialogContent: {
        maxHeight: '70vh',
        width: '77vw',
        background: '#121848',
    }
});

export default withStyles(styles)(SingleRepBills);

