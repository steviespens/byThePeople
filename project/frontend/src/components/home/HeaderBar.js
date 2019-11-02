import React from "react";
import ReactDOM from "react-dom";
import LoginHeader from '../login/LoginHeader';
import { isLoggedIn } from '../utilities/helpers';
import AuthService from './AuthService';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../login/RegisterForm';
const HeaderBar = (props) => {
    const Auth = new AuthService();

    const handleLogout = () => {
        Auth.logout();
        location.reload();
        // props.history.replace('/');
    }
    return (
        <div className="header-bar">
        {/* <React.Fragment> */}
            {/* <img className='logo' src="https://bythepeople.s3.amazonaws.com/favicon.jpg">
            </img> */}
            <a href="/">By The People</a>
            {!isLoggedIn() ?
                    <LoginHeader></LoginHeader> :
                <button type="button" className="header-logout-button" onClick={handleLogout}>Logout</button>
               
            }
        
        {/* </React.Fragment> */}
        </div>
    );
};

export default withRouter(HeaderBar);
// const wrapper = document.getElementById("header-bar");
// wrapper ? ReactDOM.render(<HeaderBar />, wrapper) : null;



