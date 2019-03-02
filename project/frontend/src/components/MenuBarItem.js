import React from "react";
import PropTypes from "prop-types";
// import key from "weak-key";



const MenuBarItem = (props) => {
    return (
        <li className="menu-bar-item">
            <a href={props.link}>{props.title}</a>
        </li>
    )
};

MenuBarItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default MenuBarItem;


// const MenuBarItem = (props) => {
//     return (
//         props.titles.map(el => {
//             return (
//                 <div className="row" key={key({ el })}>
//                     <a href={el.toLowerCase()}>{el}</a>
//                 </div>

//             )
//         }
    
//         )
//     )
// };

// MenuBarItem.propTypes = {
//     titles: PropTypes.array.isRequired,
//     links: PropTypes.array.isRequired
// };


