import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';
import { red } from "@material-ui/core/colors";

const styles = createStyles({
    root: {
        // justifyContent: 'space-around',
        color: 'black',
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: 'inherit',
        // button:active {
        //     border: '1px solid black',
        // }




    },


});


function ListItem(props) {

    return (
        // <div className={props.classes.root}>
        //     {props.children}
        // </div>
        <button className={props.classes.root} type="button" id={props.id} value={props.value} onClick={props.onClick}>
            {props.value}
           
        </button>

    );

}
export default withStyles(styles)(ListItem);

