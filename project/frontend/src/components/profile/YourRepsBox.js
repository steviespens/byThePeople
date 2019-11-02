import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
import { range } from '../utilities/helpers';
import AuthService from '../home/AuthService';
import { RepsContext } from '../home/Home';
import { withRouter } from 'react-router-dom';
import List from '../UIElements/List';
import ListItem from '../UIElements/ListItem';

function YourRepsBox(props) {
    // const Auth = new AuthService();
    const reps = useContext(RepsContext);
    // const [senators, setSenators] = useState([]);
    // const [houseReps, setHouseReps] = useState([]);
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


    const states = {
        'AK': 1, 'AL': 7, 'AR': 4, 'AZ': 9, 'CA': 53, 'CO': 7, 'CT': 5, 'DE': 1, 'FL': 27,
        'GA': 14, 'HI': 2, 'IA': 4, 'GA': 14, 'HI': 2, 'IA': 4, 'GA': 14, 'HI': 2, 'IA': 4,
        'ID': 2, 'IL': 18, 'IN': 9, 'KS': 4, 'KY': 6, 'LA': 6, 'MA': 9, 'MD': 8, 'ME': 2,
        'MI': 14, 'MN': 8, 'MO': 8, 'MS': 4, 'MT': 1, 'NC': 13, 'ND': 1, 'NE': 3, 'NH': 2,
        'NJ': 12, 'NM': 3, 'NV': 4, 'NY': 27, 'OH': 16, 'OK': 5, 'OR': 5, 'PA': 18, 'RI': 2,
        'SC': 7, 'SD': 1, 'TN': 9, 'TX': 36, 'UT': 4, 'VA': 11, 'VT': 1, 'WA': 10, 'WI': 8,
        'WV': 3, 'WY': 1
    };
    const makeYourRepsList = () => {
        
        return yourReps.map((el, index) => {
            let name = el.member.short_title + ' ' + el.member.first_name + " " + el.member.last_name;
            name += '   [' + el.member.party + ' - ' + el.member.state.toUpperCase();
            name += (el.member.chamber == 'S' ? ']' : ' - ' + el.district + ']')
            //can add secondary={} attribute in ListItemText
            return (
                <ListItem key={index} primary={name} onClick={() => onClick(el.member.first_name + " " + el.member.last_name)}>
                    {/* <ListItemText primary={name} />    */}
                </ListItem>
            );

            // return (
            //     <li>{el.member.first_name + " " + el.member.last_name}</li>
            // );
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
