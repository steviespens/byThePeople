import React from "react";
import PollNoResult from "./PollNoResult";
import PollResult from "./PollResult";
import AuthService from "../home/AuthService";
import { isLoggedIn } from '../utilities/helpers';


export default class Poll extends React.Component {
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
        if (!isLoggedIn()) return;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "poll_id": this.props.poll.id,
            })
        }
        this.Auth.fetch('api/polluservotes/user_has_voted_poll/', options).then((data) => {
            const previouslyVoted = data == 'true';
            // console.log('called mount')
            this.setState({
                poll: this.props.poll,
                selected: previouslyVoted
            })
        })
    }

    componentDidUpdate() {
        if (!isLoggedIn()) return;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "poll_id": this.props.poll.id,
            })
        }
        this.Auth.fetch('api/polluservotes/user_has_voted_poll/', options).then((data) => {
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

        if (!isLoggedIn()) {
            alert('Please create an account in order to vote')
            return
        };

        const options = {
            method: 'POST',
            body: JSON.stringify({
                'choice_id': e.currentTarget.value
            })
        }
        
        this.Auth.fetch('api/choices/vote/', options)
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
        const handleChoice = this.handleChoice;
        return (this.state.selected ? <PollResult poll={poll} /> : <PollNoResult poll={poll} handleChoice={handleChoice}/>);
    }
}

