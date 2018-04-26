//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

// locals
import s from './Content.style';
import Home from '../Home/Home';
import Login from '../Login/Login';
import UserPage from '../UserPage/UserPage';

//
// Class defintion 
//------------------------------------------------------------------
export default class Content extends Component {
    // Constructor
    //------------------------------------------

    state = {
        user: null
    }

    // Life cycle methods
    //------------------------------------------
    componentWillMount() {
        this.setState({
            user: this.props.user,
            dropdownOpen: false
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        const oldId = this.props.user;
        const newId = nextProps.user;
        if (oldId !== newId) {
            this.setState({
                user: nextProps.user
            })
        }
    }

    // Local methods
    //------------------------------------------

    // render
    //------------------------------------------    
    render () {
        const { user } = this.state;
        return (
            <div>
                <Route exact path="/" ender={props => (
                    <Home {...props} user={user} />
                )} />
                <Route path="/login" render={props => (
                    <Login {...props} user={user} />
                )} />
                <Route path="/user" render={props => (
                    <UserPage {...props} user={user} />
                )} />
            </div>
        )
    }
}