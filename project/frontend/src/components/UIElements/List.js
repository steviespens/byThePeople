import React from "react";

function List(props) {

    return (
       
        <div className={props.className}>
            {props.children}
        </div>

    );

}

export default List;

