import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        backgroundColor: 'white',
        justifyContent: 'center', 
        display: 'flex',
        border: '1px solid black',
        borderRadius: '4px',
        height: '30px',
        width: '50%',
        margin: '1%',
        padding: '0%',
        alignItems: 'center',
        maxHeight: '30px',

       
        // background: 'linearGradient(top, red, red 70%, transparent 70 %, transparent 100 %)',
        // backgroundImage: '-webkit-linear-gradient(left, red, red 70%, transparent 70%, transparent 100%)'
    },
    middle: {
        margin: '0%',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        // alignSelf: 'center',
        marginLeft: '3%',
    },

});

function PollListItemNoVote(props) {

    const text = props.text;
    const value = props.value;
    const onSelect = props.onSelect;
    return (
        
        <button className={props.classes.root} onClick={(e) => onSelect(e)} value={value}>
            <h6 className={props.classes.middle}>
                {text}
            </h6>
        </button>
    
    );

}
export default withStyles(styles)(PollListItemNoVote);
