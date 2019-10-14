import React, { Component } from "react";


function ListItem(props) {

    return (
        <div className='list-item' role="button" onClick={props.onClick}>
            <div className='list-item-inner-div'>
                {props.children}
                <span className='list-item-inner-span'>
                    
                    <p className='p1'>{props.primary}</p>
                    <p className='p2'>{props.secondary}</p>
                </span>
            </div>
        </div>

    );

}
export default ListItem;

