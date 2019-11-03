import React, { useState, useEffect } from "react";

import { withStyles, createStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import ListItem from '../UIElements/ListItem';
import Bill from '../docket/Bill';
import List from '../UIElements/List';
import AuthService from '../home/AuthService';
import { parseBillID } from '../utilities/helpers';


const SingleRepRecentVotes = (props) => {
    
    const Auth = new AuthService();
    const { rep } = props;
    const [votes, setVotes] = useState(null)
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
        Auth.fetch('reps/member/get_recent_votes_by_member_by_id/', options).then((data) => {
            setVotes(data);
        })
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

    const makeIcon = (position) => {
        if (position == 'Yes') return <CheckIcon style={{ color:'#00ffcc'}}/>
        else if (position == 'No') return <CancelIcon style={{ color: '#ff9999'}}/>
        else return <HourglassEmptyIcon style={{ color: 'gray'}}/>
    }

    const makeVotes = () => {
        return votes.map((el, index) => {
            return (
                <ListItem key={index} onClick={() => onClick(el.bill.bill_id)} primary={el.bill.short_title} secondary={el.bill.bill_id}>
                    <ListItemIcon id='list-item-icon'>
                        {makeIcon(el.position)}
                    </ListItemIcon>
                </ListItem>
            );
        });
    }

    return (
        <div className="single-rep-recent-votes">
            {votes == null ? <div></div> : (
                <React.Fragment>

                    <h6>Recent Votes by this Rep</h6>
                    <List>
                        {makeVotes()}
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

export default withStyles(styles)(SingleRepRecentVotes);

