import React from "react";
import PollListItem from './PollListItem';
import PollList from './PollList';

export default function PollResult(props) {

    const poll = props.poll;
    const c = poll.choices;
    var totalVotes = 0;

    for (var i = 0; i < c.length; i++) {
        totalVotes += c[i].votes;
    }

    const choices = c.map((choice) => {
        var n = choice.votes / totalVotes;
        return (
            <PollListItem key={choice.id} text={choice.choice} percentage={(n * 100).toFixed().toString() + '%'}/>
        );
    });
    
    return (
        <PollList question={poll.question} numVotes={"Votes: " + totalVotes}>
            {choices.reverse()}
        </PollList>
    );

}
