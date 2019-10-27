import React, { Component } from "react";
import PropTypes from "prop-types";

export default function ChoiceList(props) {
    const choices = props.poll.choices.reverse();
    // console.log(choices);
    return (
        <ul className="choice-list">
            {choices.map((el) => (<li key={el.id}>{el.choice}</li>))}
        </ul>
        
    );
}

// ChoiceList.propTypes = {
//     props: PropTypes.array.isRequired,
// };

// export default ChoiceList;
