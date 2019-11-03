import React from "react";
import { useEffect } from 'react';

const LoginForm = (props) => {
    
    return (
        <div className="card">
            <h1>Login</h1>
            <form onSubmit={props.handleFormSubmit}>
                <input
                    className="form-item"
                    placeholder="Email goes here..."
                    name="email"
                    type="text"
                    onChange={props.handleChange}
                />
                <input
                    className="form-item"
                    placeholder="Password goes here..."
                    name="password"
                    type="password"
                    onChange={props.handleChange}
                />
                <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                />
            </form>
        </div>
    );
};


export default LoginForm;




