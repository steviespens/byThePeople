import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import AuthService from '../home/AuthService';
import List from '../UIElements/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Bill from '../docket/Bill';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles, createStyles } from '@material-ui/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ListItem from '../UIElements/ListItem';


import { parseBillID } from '../utilities/helpers';

const styles = createStyles({
    root: {

        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: '80vw',
        maxWidth: '80vw',
    },
    dialog: {
        // minHeight: '80vh',
        maxHeight: '100vh',
        // minWidth: '80vw',
        maxWidth: '100vw',
    },
    dialogContent: {
        maxHeight: '70vh',
        width: '77vw',
        background: '#121848',


    }

});


const SingleRepRecentVotes = (props) => {


    const { rep } = props;
    const Auth = new AuthService();
    const [votes, setVotes] = useState(null)
    const [bill, setBill] = useState(null);
    const [bill_id, setBillID] = useState(null);
    const [open, setOpen] = useState(false);
    const id = rep.member.identifier;

    //DEPENDENCY in this component on how json for reps is structured. would like to update db to have district and make variable names compatible with how json will be received using external API calls
    const options = {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    }

    useEffect(() => {
        Auth.fetch('reps/member/get_recent_votes_by_member_by_id/', options).then((data) => {
            // const data = JSON.parse(d).results[0].bills;
            setVotes(data);
        })
    }, [props])
    
    //need to ensure what these are: id and billid
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
                        // className={props.classes.dialog}
                        // paperWidthXl
                        open={open}
                        onClose={() => setOpen(false)}
                    // scroll='paper'
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


export default withStyles(styles)(SingleRepRecentVotes);

