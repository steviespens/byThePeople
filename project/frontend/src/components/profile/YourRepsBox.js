import React, { useState, useEffect, useContext } from 'react';
import { RepsContext } from '../home/Home';
import { withRouter } from 'react-router-dom';
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';

function YourRepsBox(props) {
    const reps = useContext(RepsContext);
    const [yourReps, setYourReps] = useState([]);

    useEffect(() => {
        if (!reps) return;
        setYourReps(reps.filter((el) => {
            return (el.member.state.toUpperCase() == props.state && (el.member.chamber == 'S' || el.district == props.district));   
        }));
    }, [props])

    const onClick = (name) => {
        props.history.push({
            pathname: '/representatives',
            state: { detail: name }
        })
    }

    const makeYourRepsList = () => {
        return yourReps.map((el, index) => {
            let name = el.member.short_title + ' ' + el.member.first_name + " " + el.member.last_name;
            name += '   [' + el.member.party + ' - ' + el.member.state.toUpperCase();
            name += (el.member.chamber == 'S' ? ']' : ' - ' + el.district + ']')
            return (
                <ListItem key={index} primary={name} onClick={() => onClick(el.member.first_name + " " + el.member.last_name)}>
                    {/* <ListItemText primary={name} />    */}
                </ListItem>
            );
        })
    }

    return (
        <div className="your-reps-box">
            <p>{yourReps.length > 0 ? 'Your Reps' : 'Select your voting district to see your reps'}</p>
            <List>
                {makeYourRepsList()}
            </List>
        </div>
    );
}

export default withRouter(YourRepsBox);
