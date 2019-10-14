import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        display: 'flex',
        border: '1px solid #333B8A',
        borderRadius: '4px',
        height: '10%',
        width: '50%',
        margin: '1%',
        padding: '0%',
        alignItems: 'center',
        maxHeight: '30px',
    },
    middle: {
        margin: '0%',
        // fontSize: '14px',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        // alignSelf: 'center',
        marginLeft: '3%',
    },
    right: {
        margin: '0%',
        // fontSize: '14px',
        fontSize: '1rem',

        display: 'flex',
        alignItems: 'center',
        marginRight: '3%',
    }
    
});

//returns an item with text in middle, string of percentage on right, gradient filled up as much as percentage
function PollListItem(props) {

    const text = props.text;
    const percentage = props.percentage;
    const s = {
        backgroundImage: '-webkit-linear-gradient(left, #0618e0, #0618e0 ' + percentage + ', #121848 ' + percentage + ', #121848 100%) ',
    };
    return (
        <div className={props.classes.root} style={s}>
            <h6></h6>
            <h6 className={props.classes.middle}>{text} </h6>
            <h6 className={props.classes.right}>{percentage}</h6>
       </div>
    );

}


export default withStyles(styles)(PollListItem);
// export default PollListItem;

            //     <ListItemText primary={choice.choice} secondary={(n * 100).toFixed().toString() + '%'} />
