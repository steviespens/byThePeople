import React, { Component } from "react";
import Comment from "./Comment";
import { withStyles, createStyles } from '@material-ui/styles';


function CommentList(props) {
    
    const list = props.comments.map(c => {
        return <Comment key={c.id} comment={c} />;
    });
    
    return (
        <div className='comment-list' id='comment-list'>
            {list}
        </div>
    );
}


const styles = createStyles({
    root: {
        overflow: 'auto',
    },
});

export default withStyles(styles)(CommentList);


