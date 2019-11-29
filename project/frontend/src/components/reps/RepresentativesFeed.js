import React, { useState, useEffect, useContext } from "react";
import Autocomplete from './Autocomplete';
import SingleRepBox from './SingleRepBox';
import SingleRepBills from './SingleRepBills';
import SingleRepRecentVotes from './SingleRepRecentVotes';
import { RepsContext } from '../home/Home';

export default function RepresentativesFeed(props) {

    const context = useContext(RepsContext);
    const reps = context;
    const [selectedRep, setSelectedRep] = useState(null);

    useEffect(() => {
        if (props.location.state && context.length > 0) {
            const requestedName = props.location.state.detail;
            props.location.state = null;
            selectRepFromName(requestedName);
        }
        else if (reps != null && !selectedRep) {
            // console.log('did else statemn')
            const rand = Math.floor(Math.random() * reps.length)
            setSelectedRep(reps[rand]);
        }
    }, [props])

    const selectRepFromName = (name) => {
        //get the index in reps[] given a string of firstName + " " + lastName
        let index = reps.findIndex((el) => {
            const name_without_middle = el.member.first_name + " " + el.member.last_name;
            const name_with_middle = el.member.first_name + " " + el.member.middle_name + " " + el.member.last_name;
            return (name_without_middle == name || name_with_middle == name);
        });
        let rep = reps[index];
        setSelectedRep(rep);
    }

    const suggestions = () => {
        if (reps == null) return []
        return reps.map(el => {
            return el.member.first_name + " " + el.member.last_name;
        })
    };
    
    return (
        <div className="representatives">
            
            <div className="left" id='reps-left'>
                <Autocomplete
                    setSelectedRep={selectRepFromName}
                    className="autocomplete"
                    suggestions={suggestions()}>
                </Autocomplete> 
                {selectedRep != null ?
                    <SingleRepBox rep={selectedRep}></SingleRepBox>
                    : null
                }
            </div>

            <div className="middle" id='reps-middle'>
                {selectedRep != null ? <SingleRepBills rep={selectedRep}></SingleRepBills> : null}
            </div>

            <div className="right" id='reps-right'>
                {selectedRep != null ?
                    <SingleRepRecentVotes
                        rep={selectedRep}>
                    </SingleRepRecentVotes>
                    : null
                }
            </div>

        </div>
    );
};
