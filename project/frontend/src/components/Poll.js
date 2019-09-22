import React from "react";
import ReactDOM from "react-dom";
import ChoiceList from "./ChoiceList";
import PropTypes from "prop-types";
import { useState } from 'react';
import { VoteChoice } from './utilities/helpers';
import PollNoResult from "./PollNoResult";
import PollResult from "./PollResult";
import AuthService from "./AuthService";

export default class Poll extends React.Component {
    //checks that passed props conform
    constructor(props) {
        super(props);
        this.handleChoice = this.handleChoice.bind(this);
        this.Auth = new AuthService()
        this.state = {
            poll: props.poll,
            selected: false
        };
    }

    componentDidMount() {
        this.Auth.fetch('polls/user_has_voted_poll/' + this.props.poll.id + '/').then((data) => {
            const previouslyVoted = data == 'true';
            // console.log('called mount')
            this.setState({
                poll: this.props.poll,
                selected: previouslyVoted
            })
        })
    }
    componentDidUpdate() {
        this.Auth.fetch('polls/user_has_voted_poll/' + this.props.poll.id + '/').then((data) => {
            const previouslyVoted = data == 'true';
            this.setState({
                poll: this.props.poll,
                selected: previouslyVoted
            })
        })
    }
    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.poll != this.props.poll || prevState.selected != this.state.selected;
    }


    handleChoice(e) {
        e.preventDefault();
        return this.Auth.fetch('api/choices/' + e.target.value + '/', { method: 'POST' })
            .then((response) => {
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
        // console.log(poll)
        // console.log(this.props.poll)
        // console.log('render')
        const handleChoice = this.handleChoice;
        return (this.state.selected ? <PollResult poll={poll} /> : <PollNoResult poll={poll} handleChoice={handleChoice}/>);
    }
}

