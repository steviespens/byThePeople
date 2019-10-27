import React, { Component } from "react";


function SingleItem(props) {

    return (
        <div className='single-item' role="button" onClick={props.onClick}>
            <div className='list-item-inner-div'>
                {props.children}
                <span className='list-item-inner-span'>
                    <p className='p1'>{props.primary}</p>
                </span>
            </div>
        </div>

    );

}
export default SingleItem;

