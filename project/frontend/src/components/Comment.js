import React, { Component, useState, useEffect } from "react";
import { withStyles, createStyles } from '@material-ui/styles';
import AuthService from './AuthService';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';

const styles = createStyles({
    root: {
        backgroundColor: 'white',
        // justifyContent: 'center', //different
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid gray',
        // height: '30px',
        // width: '100%',
        minHeight: '8vh',
        margin: '0% 0% 1% 0%',
        padding: '0%',
        // alignItems: 'center',

    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        // width: '20%',
        alignItems: 'center',
    },
    likeButton: {
        // width: '5px',
        // height: '15px',
        // fontSize: '8px',
        // textAlign: 'center',
        width: '0%',
        height: '0%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        
    },
    dislikeButton: {
        // width: '5px',
        // height: '15px',
        // fontSize: '8px',
        // textAlign: 'center',
        width: '0',
        height: '0',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
    },

    h4: {
        fontSize: '8px',
        margin: '0%',
    },
    middle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // width: '75%',
        // overflow: 'scroll',

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
    },
    icon: {
        height: '10px',
    },


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
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "comment_id": id,
            })
        }

        Auth.fetch('/api/comments/get_user_email_for_comment/', options).then((data) => {
            setEmail(data);
        });
        checkUserLikedComment();

    }, [likeButtonStyle, dislikeButtonStyle])

    const likeComment = (e) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "comment_id": id,
                "action": e.currentTarget.value
            })
        }
        Auth.fetch('/api/comments/like/', options).then((data) => {
            setComment(data[0]);
            checkUserLikedComment();

        });
    };
    function checkUserLikedComment() {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "comment_id": id,
            })
        }

        Auth.fetch('/api/commentuserlikes/user_has_liked_comment/', options).then((data) => {
            
            const likeInt = 1;
            const dislikeInt = 2;
            if (data == likeInt) {
                setLikeStatus(likeInt)
            } else if (data == dislikeInt) {
                setLikeStatus(dislikeInt)
            }
        });
    }
    const likeButtonStyle = likeStatus == 1 ? { backgroundColor: '#b3ccff' } : {};
    const dislikeButtonStyle = likeStatus == 2 ? { backgroundColor: '#b3ccff' } : {};
    return (
       
        <div className={props.classes.root}>
            <div className={props.classes.left}>
                <button style={likeButtonStyle} className={props.classes.likeButton} value={1} onClick={likeComment}>
                    <KeyboardArrowUpIcon value={1}style={{height: '8px'}}> </KeyboardArrowUpIcon>
                </button>
                {/* <button style = {likeButtonStyle} className={props.classes.likeButton} value={1} onClick={likeComment}></button> */}
                <h4 className={props.classes.h4}>{numLikes}</h4>
                <button style={dislikeButtonStyle} className={props.classes.likeButton} value={2} onClick={likeComment}>
                    <KeyboardArrowDownIcon value={2}style={{ height: '8px' }}> </KeyboardArrowDownIcon>
                </button>
                {/* <button style = {dislikeButtonStyle} className={props.classes.dislikeButton} value={2} onClick={likeComment}></button> */}
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

