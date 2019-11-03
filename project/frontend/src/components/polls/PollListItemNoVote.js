import React from "react";


function PollListItemNoVote(props) {
    const text = props.text;
    const value = props.value;
    const onSelect = props.onSelect;

    return (    
        <button className='poll-list-item-no-vote' onClick={(e) => onSelect(e)} value={value}>
            <p className='poll-list-item-no-vote-middle'>
                {text}
            </p>
        </button>
    );
}

export default PollListItemNoVote;

