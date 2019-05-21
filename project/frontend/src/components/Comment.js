import React, { Component, useState, useEffect } from "react";
import { withStyles, createStyles } from '@material-ui/styles';
import AuthService from './AuthService';

const styles = createStyles({
    root: {
        backgroundColor: 'white',
        // justifyContent: 'center', //different
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid gray',
        // height: '30px',
        // width: '50%',
        margin: '1%',
        padding: '0%',
        // alignItems: 'center',

    },
    left: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '5px',
        height: '15px',
        fontSize: '8px',
    },
    h6: {
        fontSize: '12px'
    },
    middle: {
        display: 'flex',
        flexDirection: 'column'
    },
    email: {
        margin: '0%',
        padding: '0%',
        fontSize: '10px',
    },
    comment: {
        margin: '0%',
        padding: '0%',
        fontSize: '14px',
    }


});


function Comment(props) {
    const Auth = new AuthService();
    const [comment, setComment] = useState(props.comment);
    const text = props.comment.text;
    const id = props.comment.id;
    // const [likes, setLikes] = useState(props.comment.likes);
    const likes = comment.likes;
    // const [dislikes, setDislikes] = useState(props.comment.dislikes);
    const dislikes = comment.dislikes;
    const numLikes = likes - dislikes;
    const [email, setEmail] = useState('');
    // const [likeButtonStyle, setLikeButtonStyle] = useState({});
    // const [dislikeButtonStyle, setDislikeButtonStyle] = useState({});
    const [likeStatus, setLikeStatus] = useState(0);

    useEffect(() => {
        Auth.fetch('/comments/get_user_email_for_comment/' + id + '/').then((data) => {
            setEmail(data);
        });
        checkUserLikedComment();

    }, [likeButtonStyle, dislikeButtonStyle])

    const likeComment = (e) => {
        Auth.fetch('/comments/like_comment/' + id + '/' + e.target.value + '/').then((data) => {
            setComment(data[0]);
            checkUserLikedComment();

        });
    };
    function checkUserLikedComment() {
        Auth.fetch('/comments/user_has_liked_comment/' + id + '/').then((data) => {
            const likeInt = 1;
            const dislikeInt = 2;
            if (data == likeInt) {
                setLikeStatus(likeInt)
            } else if (data == dislikeInt) {
                setLikeStatus(dislikeInt)
            }
        });
    }
    const likeButtonStyle = likeStatus == 1 ? { backgroundColor: 'blue' } : {};
    const dislikeButtonStyle = likeStatus == 2 ? { backgroundColor: 'blue' } : {};
    return (
        <div className={props.classes.root}>
            <div className={props.classes.left}>
                <button style = {likeButtonStyle} className={props.classes.button} value={1} onClick={likeComment}>Like</button>
                <h6 className={props.classes.h6}>{numLikes}</h6>
                <button style = {dislikeButtonStyle} className={props.classes.button} value={2} onClick={likeComment}>Dislike</button>
            </div>
            <div className={props.classes.middle}>
                <p className={props.classes.email}>{email}</p>
                <p className={props.classes.comment}>{text}</p>
            </div>
            <div>

            </div>
        </div>
      
    );
    

}
export default withStyles(styles)(Comment);

