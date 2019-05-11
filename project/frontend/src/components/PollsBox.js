import React from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import DataProvider from "./DataProvider";
import Poll from "./Poll";
import PropTypes from "prop-types";
import TextField from '\@material-ui/core/TextField';
import { map } from "bluebird";




const PollsBox = (props) => {
    return (
        <div className="polls-box">
            <h5>{props.title}</h5>
            <DataProvider endpoint="api/polls/"
                render={(data) => {
                    return (data.map((el) => {
                        return (
                            <div id="poll-individual">
                                <Poll key={el.id} poll={el} />
                            </div>
                        );
                        }
                    ));
                }} />
        </div>
    );
};

// PollsBox.propTypes = {
//     title: PropTypes.string.isRequired,
// };

export default PollsBox;



//before you changed it for the pollsbox
// const PollsBox = (props) => {
//     return (
//         <div className="polls-box">
//             <h5>{props.title}</h5>
//             <DataProvider endpoint="api/polls/"
//                 render={(data) => {
//                     return (
//                         data.map(
//                             (el) => <Poll key={el.id} poll={el} />

//                         ));
//                 }} />
//         </div>
//     );
// };

// // PollsBox.propTypes = {
// //     title: PropTypes.string.isRequired,
// // };

// export default PollsBox;



