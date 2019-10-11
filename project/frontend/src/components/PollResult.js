import React from "react";
import ReactDOM from "react-dom";
import ChoiceList from "./ChoiceList";
import PropTypes from "prop-types";
import { useState } from 'react';
import { Radio, RadioGroup } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { VoteChoice } from './utilities/helpers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PollListItem from './UIElements/PollListItem';
import PollList from './UIElements/PollList';



export default function PollResult(props) {

    const poll = props.poll;
    // const c = poll.choices.reverse();
    const c = poll.choices;

    var sum = 0;
    for (var i = 0; i < c.length; i++) {
        sum += c[i].votes;
        
    }
    var totalVotes = sum;
    // const choices = c.map((choice) => (<FormControlLabel key={choice.id} value={choice.choice} label={choice.choice}
    //     control={<Radio value={choice.id} />} style={{ marginBottom: 16, maxWidth: 600, wordWrap: "break-word" }} />));
    const choices = c.map((choice) => {
        var n = choice.votes / totalVotes;
        return (
            // <ListItem key={choice.id} dense={true}>
            //     <ListItemText primary={choice.choice} secondary={(n * 100).toFixed().toString() + '%'} />
            // </ListItem>
            <PollListItem key={choice.id} text={choice.choice} percentage={(n * 100).toFixed().toString() + '%'}/>
        );
    });
    
    return (
        // <List> 
        //     {choices} 
        // </List>
        <PollList question={poll.question} numVotes={"Votes: " + sum}>
            {choices.reverse()}
        </PollList>
    );

}
