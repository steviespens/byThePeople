import React, { useEffect } from "react";
import AuthService from '../home/AuthService';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/styles';

import { parseBillID } from '../utilities/helpers';

const BillDialogue = (props) => {

    const Auth = new AuthService();
    const open = props.open;
    const onClose = () => {
        props.onClose();
    }
    const title = makeTitle(props.bill);
    const { classes } = props;

    useEffect(() => {
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

        Auth.fetch('api/textfiles/get_bill_html/', options).then((data) => {
            data = JSON.parse(data)
            const full_text = data["full_text"]
            const summary = data["summary"]
            const d = full_text.substring(1, full_text.length - 1)
            if (d.length > 0 && d != '') {
                const tmp = <div dangerouslySetInnerHTML={{ __html: d }} />
                props.setLoaded(tmp)
            } else {
                props.setLoaded('Loading...')
            }
            props.setSummary(summary);
        })

    }, [props.bill])


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            scroll='paper'
            PaperProps={{
                style: {
                    backgroundColor: '#121848',
                    fontColor: 'white',
                },
            }}
        >
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent
                className={classes.dialogContent}
            >
                {props.loaded}
            </DialogContent>
            </Dialog>
    );
}

const styles = () => ({
    title: {
        color: 'white',
    },
   
    dialogContent: {
        color: '#cccccc',
        marginTop: '2%',
    }

});

export default withStyles(styles)(BillDialogue);

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


