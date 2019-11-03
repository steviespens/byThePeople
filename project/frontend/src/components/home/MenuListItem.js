import React from "react";
import { withStyles, createStyles } from '@material-ui/styles';


function MenuListItem(props) {
    
    return (
        <button className='menu-list-item' type="button" id={props.id} value={props.value} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const styles = createStyles({
    root: {
        color: 'black',
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: 'inherit',
    },
});

export default withStyles(styles)(MenuListItem);

