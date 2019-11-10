import React from "react";
import { isLoggedIn } from '../utilities/helpers';
import LoginHeader from '../login/LoginHeader';
import AuthService from './AuthService';

const HeaderBar = (props) => {
    const Auth = new AuthService();

    const handleLogout = () => {
        Auth.logout();
        location.reload();
    }

    return (
        <div className="header-bar">
            <a href="/">By The People</a>
            {!isLoggedIn() ?
                    <LoginHeader></LoginHeader> :
                <button type="button" className="header-logout-button" onClick={handleLogout}>Logout</button>
            }
        </div>
    );
};

export default HeaderBar;



