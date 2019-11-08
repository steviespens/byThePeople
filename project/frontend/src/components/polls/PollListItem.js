import React from "react";
import { withStyles, createStyles } from '@material-ui/styles';


function PollListItem(props) {
    
    const text = props.text;
    const percentage = props.percentage;
    //dynamic style object that fills vote percentage bar with color, depending on vote percentages
    const gradientStyle = {
        backgroundImage: '-webkit-linear-gradient(left, #0618e0, #0618e0 ' + percentage + ', #121848 ' + percentage + ', #121848 100%) ',
    };

    return (
        <div className={props.classes.root} style={gradientStyle}>
            <p className={props.classes.left}></p>
            <p className={props.classes.middle}>{text} </p>
            <p className={props.classes.right}>{percentage}</p>
       </div>
    );

}

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
    left: {
        width: '33%',
    },
    middle: {
        margin: '0%',
        // fontSize: '14px',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        // alignSelf: 'center',
        // textAlign: 'center',
        marginLeft: '3%',
        width: '33%',
        justifyContent: 'center',

    },
    right: {
        margin: '0%',
        // fontSize: '14px',
        fontSize: '1rem',

        display: 'flex',
        alignItems: 'center',
        marginRight: '3%',
        justifyContent: 'flex-end',
        width: '33%',
    }
});

export default withStyles(styles)(PollListItem);
