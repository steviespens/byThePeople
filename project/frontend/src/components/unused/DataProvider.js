import React, { Component } from "react";
import PropTypes from "prop-types";
//always extend Component
import { randomElement } from "../utilities/helpers.js";
import AuthService from "../home/AuthService"

class DataProvider extends Component {
    //checks that passed props conform
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading..."
        };
    }
  
    //called after render(), the placeholder field is rendered until we call setState and the component is re-rendered
    componentDidMount() {
        this.Auth.fetch(this.props.endpoint)
            //no parantheses if using a literal. below is the fulfilled state after settlement, notice there is no rejected state
            //if you do not specify state handlers, a promise resolves to another promise with the original state of the returned
            //  original value
            // .then(response => {
            //     if (response.status !== 200) {
            //         return this.setState({ placeholder: "Something went wrong" });
                    
            //     } 
            //     return response.json();
            // })
            .then(data => this.setState({ data: data, loaded: true }));
    }
    //called first, will be called again after setState() is called (a change in state)
    render() {
        const { data, loaded, placeholder } = this.state;
        return loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}
//A module is a self contained unit that can expose assets to other modules using export, 
//  and acquire assets from other modules using import.
export default DataProvider;

//anonymous function is function without a name