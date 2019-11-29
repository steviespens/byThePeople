import React from "react";

function List(props) {

    return (
       
        <div className={props.className} id={props.id}>
            {props.children}
        </div>

    );

}

export default List;

