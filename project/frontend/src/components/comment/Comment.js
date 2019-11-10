import React, { useState, useEffect } from "react";
import AuthService from '../home/AuthService';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { isLoggedIn } from '../utilities/helpers';

function Comment(props) {

    const Auth = new AuthService();
    const [email, setEmail] = useState('');
    const [likeStatus, setLikeStatus] = React.useState(0);
    const [comment, setComment] = React.useState(props.comment);
    const text = props.comment.text;
    const id = props.comment.id;
    const likes = comment.likes;
    const dislikes = comment.dislikes;
    const numLikes = likes - dislikes;

    useEffect(() => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "comment_id": id,
            })
        }
        
        Auth.fetch('/api/comments/get_user_email_for_comment/', options).then((data) => {
            setEmail(data);
        }).catch((rej) => {

        });

        checkUserLikedComment();

    },
        [likeButtonStyle, dislikeButtonStyle]
    )


    const likeComment = (e) => {
        if (!isLoggedIn()) {
            alert('Please create an account to like comments')
            return
        };

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
        }).catch((rej) => {

        });
    }

    const likeButtonStyle = likeStatus == 1 ? { backgroundColor: '#ff9999' } : {};
    const dislikeButtonStyle = likeStatus == 2 ? { backgroundColor: '#ff9999' } : {};

    return (
        <div className='comment'>
            <div className='left'>
                <button style={likeButtonStyle} className='like-button' value={1} onClick={likeComment}>
                    <KeyboardArrowUpIcon value={1} style={{ height: '8px', color: 'black'}}> </KeyboardArrowUpIcon>
                </button>
                <h4 className='comment-h4'>{numLikes}</h4>
                <button style={dislikeButtonStyle} className='like-button' value={2} onClick={likeComment}>
                    <KeyboardArrowDownIcon value={2} style={{ height: '8px', color: 'black'}}> </KeyboardArrowDownIcon>
                </button>
            </div>

            <div className='middle'>
                <p className='email'>{email}</p>
                <p className='comment-text'>{text}</p>
            </div>

            {/* empty div to apply css justifyContent */}
            <div></div>

        </div>
    );
}

export default Comment;

