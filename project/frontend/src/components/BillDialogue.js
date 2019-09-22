import React, { useEffect, useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { parseBillID } from './utilities/helpers';

import AuthService from './AuthService';
import { reduce } from "bluebird";

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        // marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const BillDialogue = (props) => {

    const Auth = new AuthService();
    const [loaded, setLoaded] = useState('Loading...');
    //you lifted the state of Open/closed for the dialog up because the open button is in a different component. but what's happening is every time Bill re-renders because open changed because of an event in this component, that rerenders BillDialogue because open is one of the props to BillDialogue. This causes useEffect to get called which undoes the reset of the Loaded variable, so now when you click a new bill that is large and takes a while to load, the old bill is still in loaded and, instead of showing a blank loading msg like you'd like, the old bill is displayed until the new bill loads and then the dialog re-renders in front of the user. it is a visible re-render
    useEffect(() => {
        console.log(props.bill.bill_id)
        const bill = parseBillID(props.bill.bill_id);
        const congress_num = bill.congressNumber;
        const num_bill = bill.billNumber;
        const prefix = makePrefix(bill.prefix)
        const options = {
            method: 'POST',
            body: JSON.stringify({
                congress_num,
                prefix,
                num_bill
            })
        }
        // console.log('called bill html')
        Auth.fetch('api/textfiles/get_bill_html/', options).then((data) => {
            const d = data.substring(1, data.length - 1)
            const tmp = <div dangerouslySetInnerHTML={{ __html: d }} />
            
            setLoaded(tmp)
            // console.log('set loading')
        })

    }, [props])    
        
    const open = props.open;
    const onClose = () => {
        props.onClose();
        setLoaded('Loading...');
        // console.log('reset loading')

    }
    const title = makeTitle(props.bill);
    
    const style = {
        whiteSpace: 'pre-wrap'
    };

    const classes = useStyles();

    return (
        <Dialog fullScreen
            open={open}
            onClose={onClose}
            scroll='paper'>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent style={style}>
                {loaded}
            </DialogContent>
        </Dialog>
    );
}
export default BillDialogue;

function makeTitle(bill) {
    const id = bill.bill_id;
    const shortTitle = bill.short_title;
    const officialTitle = bill.official_title;
    var title = id.toUpperCase().split('-')[0] + ' - ';
    title += shortTitle != null ? shortTitle : officialTitle;
    return title;
}

function makePrefix(p) {
    if (p == 'hr') return 'house-bill'
    else if (p == 'hres') return 'house-resolution'
    else if (p == 's') return 'senate-bill'
    else return null
}

