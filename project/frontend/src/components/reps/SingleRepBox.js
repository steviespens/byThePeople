import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
//quoted import statements contain a string with the path to a file
import AuthService from '../home/AuthService';
import List from '../UIElements/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const SingleRepBox = (props) => {


    const { rep } = props;
    const name = rep.member.short_title + " " + rep.member.first_name + " " + rep.member.last_name;
    // const photo = 'https://theunitedstates.io/images/congress/225x275/' + rep.member.identifier + '.jpg';
    const photo = rep.member.picture_uri;
    const photoErr = 'https://www.congress.gov/img/member/' + rep.member.identifier.toLowerCase() + '.jpg';
    const Auth = new AuthService();
    const [repData, setRepData] = useState(null);
    //DEPENDENCY in this component on how json for reps is structured. would like to update db to have district and make variable names compatible with how json will be received using external API calls
    const id = rep.member.identifier;
    const options = {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    }

    useEffect(() => {
        Auth.fetch('reps/member/get_member_by_id/', options).then((d) => {
            
            const data = JSON.parse(d).results[0];
            setRepData(data);
        })
    }, [props])
    const makeRepName = () => {
        // if (repData == null) return null;
        const rep = repData;
        const roles = rep.roles[0];
        let heading = roles.short_title + ' ' + rep.first_name + ' ' + rep.last_name + '   [' + roles.party + ' - ' + roles.state.toUpperCase()
        heading += (roles.chamber == 'Senate' ? ']' : ' - ' + roles.district + ']')
        return heading;
    }
    const makeCommittees = () => {
        const committees = repData.roles[0].committees;
        const l = committees.map((c, index) => {
            return (
                <ListItem button key={index} onClick={() => {return}}>
                    <ListItemText primary={c.name} />
                </ListItem>
            );
        });
        return l;

    }
    return (
        //only specify the width property since some images are cropped differently
        
        <div className="single-rep-box">
            {repData == null ? <div></div> : (
                <React.Fragment>
                    <h4>
                    {makeRepName()}
                    </h4>
                    <img src={photo}
                        // onError={(e) => {
                        // e.target.src = photoErr;
                        // }}
                        alt={name} width="175" ></img>
                    <p>{repData.bio}</p>
                    {/* <h6>Committees:</h6>
                    <List>
                        {makeCommittees()}
                    </List> */}

                </React.Fragment>
            )}
        </div>
            

        
    );
};


export default SingleRepBox;

