import React from "react";
import PollListItemNoVote from './PollListItemNoVote';
import PollList from './PollList';

export default function PollNoResult(props) {

    const poll = props.poll;
    const c = poll.choices;

    const choices = c.map((choice) => {
        return (
            <PollListItemNoVote key={choice.id} text={choice.choice} onSelect={props.handleChoice} value={choice.id}/>
        );
    });

    return (
        <PollList question={poll.question}>
            {choices.reverse()}
        </PollList>
    );

}
