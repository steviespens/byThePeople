import React, { Component } from "react";
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        // justifyContent: 'space-around',

    },
    

});


function MainFeedList(props) {


    return (
        // <div className={props.classes.root}>
        //     {props.children}
        // </div>
        <div className="menu-bar">
            {props.children}
        </div>

    );

}
// export default withStyles(styles)(MainFeedList);
export default MainFeedList;

