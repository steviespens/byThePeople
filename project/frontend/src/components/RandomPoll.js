import { randomElement } from "./utilities/helpers.js";
import React, { Component } from "react";
import PropTypes from "prop-types";

import ChoiceList from "./ChoiceList";




export default function Poll(props) {

    // const poll = randomElement(props.poll);
    const poll = props.poll[1];
    const topic = poll.topic;
    const question = poll.question;
    return (
     
        // <div className="random-poll">
        //     return (
        //         <div className='a-poll'>
        //             <h6>{topic}</h6>
        //             <br></br>
        //             {question}
        //             <ChoiceList poll={poll} />
        //         </div>
        //     );
        // </div>
        <p></p>


    );
}
