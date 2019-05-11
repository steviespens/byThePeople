import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        // justifyContent: 'space-around',

    },


});


function List(props) {


    return (
        // <div className={props.classes.root}>
        //     {props.children}
        // </div>
        <div className={props.className}>
            {props.children}
        </div>

    );

}
// export default withStyles(styles)(MainFeedList);
export default List;

