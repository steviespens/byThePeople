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
import PollNoResult from "./PollNoResult";
import PollResult from "./PollResult";




export default class Poll extends React.Component {
    //checks that passed props conform
    constructor(props) {
        super(props);
        this.handleChoice = this.handleChoice.bind(this);
        this.state = {
            poll: props.poll,
            selected: false
        };
    }

    // static propTypes = {
    //     poll: PropTypes.object.isRequired,
    // };
    //plain object you create
    // state = {
    //     choice: null
    //     // loaded: false,
    //     // placeholder: "Loading..."
    // };


    handleChoice(e) {
        e.preventDefault();
        return VoteChoice(e.target.value)
            .then((response) => {
                // console.log(response);
                // const c = response.choices[0].choice;
                this.setState({
                    poll: response,
                    selected: true
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {
        const poll = this.state.poll;
        const handleChoice = this.handleChoice;
        // const choices = c.map((choice) => (<FormControlLabel key={choice.id} value={this.state.choice} label={choice.choice}
        //     control={<Radio onChange={handleChoice} value={choice.id} />} style={{ marginBottom: 16, maxWidth: 600, wordWrap: "break-word" }} />));
        // console.log(choices[0]);
        // console.log(this.state.choice);
        return (this.state.selected ? <PollResult poll={poll} /> : <PollNoResult poll={poll} handleChoice={handleChoice}/>);
        // return (
        //     <FormControl>
        //         <FormLabel>{poll.question}</FormLabel>
        //         <RadioGroup>
        //             {choices}
        //         </RadioGroup>
        //     </FormControl>


        // );
    }
}

