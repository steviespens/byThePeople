import React, {useState, useEffect} from "react";
import AuthService from '../home/AuthService';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const SingleRepBox = (props) => {
    const Auth = new AuthService();
    const { rep } = props;
    const name = rep.member.short_title + " " + rep.member.first_name + " " + rep.member.last_name;
    const photo = rep.member.picture_uri;
    const id = rep.member.identifier;
    const [repData, setRepData] = useState(null);
    
    const options = {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    }

    useEffect(() => {
        let isSubscribed = true
        Auth.fetch('reps/member/get_member_by_id/', options).then((d) => {
            const data = JSON.parse(d).results[0];
            if (isSubscribed) {
                setRepData(data);
            }
        })
        return () => isSubscribed = false
        
    }, [props])
    
    const makeRepName = () => {
        const rep = repData;
        const roles = rep.roles[0];
        let heading = roles.short_title + ' ' + rep.first_name + ' ' + rep.last_name + '   [' + roles.party + ' - ' + roles.state.toUpperCase()
        heading += (roles.chamber == 'Senate' ? ']' : ' - ' + roles.district + ']')
        return heading;
    }
    
    return (
        //only specify the width property since some images are cropped differently
        <div className="single-rep-box">
            {repData == null ? <div></div> : (
                <React.Fragment>
                    <h4>{makeRepName()}</h4>
                    <img src={photo}
                        alt={name} width="175" ></img>
                    <p>{repData.bio}</p>
                </React.Fragment>
            )}
        </div>
    );
};

export default SingleRepBox;

