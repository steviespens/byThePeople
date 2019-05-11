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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PollListItemNoVote from './UIElements/PollListItemNoVote';
import PollList from './UIElements/PollList';



export default function PollNoResult(props) {

    const poll = props.poll;
    // console.log(poll);
    const c = poll.choices.reverse();
    // const choices = c.map((choice) => (<FormControlLabel key={choice.id} value={choice.choice} label={choice.choice}
    //     control={<Radio onChange={props.handleChoice} value={choice.id} />} style={{ marginBottom: 16, maxWidth: 600, wordWrap: "break-word" }} />));
    const choices = c.map((choice) => {
        return (
           
            <PollListItemNoVote text={choice.choice} onSelect={props.handleChoice} value={choice.id}/>
        );
    });

    return (
        <PollList question={poll.question}>
            {choices}
        </PollList>


    );

}
