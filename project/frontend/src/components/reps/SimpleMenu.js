import React, {useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { range } from '../utilities/helpers';
import AuthService from '../home/AuthService';
import { RepsContext } from '../home/Home';
import YourRepsBox from './YourRepsBox';


function SimpleMenu(props) {
    const Auth = new AuthService();
    const msg = 'State';
    const msg2 = 'District';
    const [stateAnchorEl, setStateAnchorEl] = useState(null);
    const [districtAnchorEl, setDistrictAnchorEl] = useState(null);
    const [stateSelection, setStateSelection] = useState(msg);
    const [districtSelection, setDistrictSelection] = useState(msg2);
    const reps = useContext(RepsContext);

    function handleClick(event) {
        setStateAnchorEl(event.currentTarget);
    }
    function handleClick2(event) {
        setDistrictAnchorEl(event.currentTarget);
    }

    useEffect(() => {
        let userMetadata = props.userMetadata;
        if (userMetadata == null) return;
        if (inputsAreValid(userMetadata.state, userMetadata.district)) {
            setStateSelection(userMetadata.state);
            setDistrictSelection(userMetadata.district);
        }
    },[props])

    function handleClose(e) {
        setStateAnchorEl(null);
        if (!e.target.getAttribute('value')) return
        setStateSelection(e.target.getAttribute('value'));
    }

    function handleClose2(e) {
        setDistrictAnchorEl(null);
        if (!e.target.getAttribute('value')) return
        setDistrictSelection(e.target.getAttribute('value'));
        
    }
    const onSubmit = () => {
        let state = stateSelection;
        let district = districtSelection;
        if (!inputsAreValid(state, district)) return;
        Auth.fetch('api/save_voting_district/', {
            method: 'POST',
            body: JSON.stringify({
                state,
                district
            })
        }).then((data) => {
            return;
        })
    }

    function inputsAreValid(state, district) {
        return Object.keys(states).includes(state) && district <= states[state] && district > 0;
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
    const statesList = () => {
        return Object.keys(states).map((el, index) => {
            return (<MenuItem key={index} value={el} onClick={handleClose}>{el}</MenuItem>);
        })
    }
    const districtsList = () => {
        if (stateSelection == msg) return;
        let d = states[stateSelection];
        return range(0, d).map((el) => {
            return (<MenuItem key={el} value={el} onClick={handleClose2}>{el}</MenuItem>);
        })
    }
    return (
        <div className="simple-menu-profile-box">
            
            <div id="simple-menu-1">
                <p>Voting District</p>
                <Button
                    aria-owns={stateAnchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{color: '#cccccc'}}
                >
                    {stateSelection}
                </Button>
                <Menu id="simple-menu" anchorEl={stateAnchorEl} open={Boolean(stateAnchorEl)} onClose={handleClose}>
                    {statesList()}
                </Menu>
                <Button
                    aria-owns={districtAnchorEl ? 'simple-menu2' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick2}
                    style={{ color: '#cccccc' }}

                >
                    {districtSelection}
                </Button>
                <Menu id="simple-menu2" anchorEl={districtAnchorEl} open={Boolean(districtAnchorEl)} onClose={handleClose2}>
                    {/* {stateSelection != msg ? districtsList() : null} */}
                    {districtsList()}
                </Menu>
                <Button onClick={onSubmit}
                    style={{ color: '#cccccc' }}>
                    Save
                </Button>

            </div>
            <YourRepsBox state={stateSelection} district={districtSelection}></YourRepsBox>
        </div>
    );
}

export default SimpleMenu;
