import React from "react";



export default function Poll(props) {

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
