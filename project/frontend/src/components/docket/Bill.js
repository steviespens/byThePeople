import React from "react";
import { useState, useEffect } from 'react';
import BillDialogue from "./BillDialogue";
import CommentBox from "../comment/CommentBox";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/styles';
import Poll from "../polls/Poll";
import { withRouter } from 'react-router-dom';
import AuthService from '../home/AuthService';


const Bill = (props) => {

    const Auth = new AuthService();
    const [open, setOpen] = useState(false);
    const [poll, setPoll] = useState(null);
    const [loaded, setLoaded] = useState('Loading...')
    const [summary, setSummary] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        if (props.bill != null) {

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    'bill_id': props.bill.bill_id
                })
            }

            Auth.fetch('api/upcomingbill/get_related_polls/', options).then(data => JSON.parse(data))
                .then((data) => {

                    if (!data.exists && poll != null) {
                        setPoll(null);
                    }
                    else if (data.exists && (poll == null || poll.id != data.polls['id'])) {
                        setPoll(data.polls)
                    }

                });
        }
    });
    
    function makeSponsorButton(bill) {
        let sponsorName = bill.sponsor;
        let sponsorState = bill.sponsor_state;
        let sponsorTitle = bill.sponsor_title;
        let sponsorParty = bill.sponsor_party;
        let heading = sponsorTitle + ' ' + sponsorName + '   [' + sponsorParty + ' - ' + sponsorState + ']';

        let onClick = (name) => {
            props.history.push({
                pathname: '/representatives',
                state: { detail: name }
            })
        }

        return (
            <button className='sponsor-button' onClick={() => onClick(sponsorName)}>
                {heading}
            </button>
        );
    }


    if (props.bill == null) {
        return <div></div>
    }

    const title = makeTitle(props.bill);
    const billInformation = makeBillInformation(props.bill);

    return (

        <div className="bill">

            <div className="top" id='bill-top'>
                <h3>{title}</h3>
                <div className="bill-button-row">
                    {makeSponsorButton(props.bill)}
                    {loaded != 'Loading...' ? (<button className='full-text-button' onClick={handleClickOpen}>Full Text</button>) : null}      
                </div>
                <div className='bill-info' id='bill-info'>
                    <p>{billInformation[1]}</p>
                    <p>{billInformation[2]}</p>
                    <p>{billInformation[3] == 'Summary: No summary available' && summary != '' ? 'Summary: ' + summary : billInformation[3]}</p>
                </div>
            </div>

            <div className="bottom">
                {poll == null ? 
                    <div></div> :
                    <div id='poll-individual'>
                        <Poll poll={poll}></Poll>
                    </div>
                }
            </div>

            <CommentBox id={props.bill.bill_id} />

            <BillDialogue
                bill={props.bill}
                open={open}
                onClose={handleClose}
                loaded={loaded}
                setLoaded={setLoaded}
                setSummary={setSummary}
            />

        </div>
        );
}


function makeTitle(bill) {
    const id = bill.bill_id;
    const shortTitle = bill.short_title;
    const officialTitle = bill.title;
    var title = id.toUpperCase().split('-')[0] + ' - ';
    title += shortTitle != null ? shortTitle : officialTitle;
    return title;
}

function makeBillInformation(bill) {
    const sponsorName = bill.sponsor;
    const sponsorState = bill.sponsor_state;
    const sponsorDistrict = '';
    const sponsorTitle = bill.sponsor_title;
    const introduced = makeIntroduced(bill.introduced_date);
    const committees = bill.committees;
    const summary = bill.summary != '' ? bill.summary : 'No summary available';
    var line1 = 'Sponsor: ' + sponsorTitle + '. ' + sponsorName + ' [' + sponsorState + '-' + sponsorDistrict + ']';
    var line2 = 'Introduced: ' + introduced;
    var line3 = 'Committees: ' + committees;
    var line4 = 'Summary: ' + summary;
    return [line1, line2, line3, line4];
}


//Parameters: string of date in 'yyyy/mm/dd' format
//Returns: string of date in 'mm/dd/yyyy' format
function makeIntroduced(d) {
    var introduced = d.split('-');
    const tmp = introduced[1];
    introduced[1] = introduced[2];
    introduced[2] = tmp;
    return introduced.reverse().join('-');
}

export default withRouter(Bill);



