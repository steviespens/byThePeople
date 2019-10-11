import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import Docket from './Docket';
import { parseBillID, makeRepName_db_compatible } from './utilities/helpers';
import AuthService from './AuthService';
import Autocomplete from './Autocomplete';

import SingleRepBox from './SingleRepBox';
import SingleRepBills from './SingleRepBills';
import SingleRepRecentVotes from './SingleRepRecentVotes';

import List from './UIElements/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RepsContext } from './Home';
export default function RepresentativesFeed(props) {


    const Auth = new AuthService();
    const context = useContext(RepsContext);
    // const [reps, setReps] = useState(context);
    // const [reps, setReps] = useState([]);
    const reps = context;
    const [selectedRep, setSelectedRep] = useState(null);
    // const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        if (props.location.state && context.length > 0) {
            const requestedName = props.location.state.detail;
            props.location.state = null;
            selectRepFromName(requestedName);
        }
        else if (reps != null && !selectedRep) {
            // console.log('did else statemn')
            const rand = Math.floor(Math.random() * reps.length)
            setSelectedRep(reps[rand]);
        }
    }, [props])
    const selectRepFromName = (name) => {
        //get the index in reps[] given a string of firstName + " " + lastName
        let index = reps.findIndex((el) => {
            const name_without_middle = el.member.first_name + " " + el.member.last_name;
            const name_with_middle = el.member.first_name + " " + el.member.middle_name + " " + el.member.last_name;
            return (name_without_middle == name || name_with_middle == name);
        });
        let rep = reps[index];
        setSelectedRep(rep);
    }

    const onClick = (rep) => {
        setSelectedRep(rep);
    }
    const makeRepName = (rep) => {
        const name = rep.member.short_title + ' ' + rep.member.first_name + ' ' + rep.member.last_name;
        const subheading = '[' + rep.member.party + ' - ' + rep.member.state.toUpperCase() + ']';
        return name + '   ' + subheading;
    }
    //DEPENDENCY in this component on how json for reps is structured. would like to update db to have district and make variable names compatible with how json will be received using external API calls
    // const repsList = () => {
    //     return reps.map((el) => {
    //         //got rid of secondary attribute
    //         return (
    //             < ListItem button key={el.member.id} onClick={() => {onClick(el)}}>
    //                 <ListItemText primary={makeRepName(el)} />
    //             </ListItem >);
    //     })
    // }

    const suggestions = () => {
        if (reps == null) return []
        return reps.map(el => {
            return el.member.first_name + " " + el.member.last_name;
    })};
    return (
        <div className="representatives">

            <div className="left">
                <Autocomplete
                    setSelectedRep={selectRepFromName}
                    className="autocomplete"
                    suggestions={suggestions()}>
                </Autocomplete> 
                {selectedRep != null ?
                    <SingleRepBox rep={selectedRep}></SingleRepBox>
                    : null
                }
            </div>

            <div className="middle">
                {selectedRep != null ? <SingleRepBills rep={selectedRep}></SingleRepBills> : null}
            </div>

            <div className="right">
                {selectedRep != null ?
                    <SingleRepRecentVotes
                        rep={selectedRep}>
                    </SingleRepRecentVotes>
                    : null
                }
            </div>
        </div>
    );
};
