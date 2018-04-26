//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// locals
import s from './Content.style';
import Home from '../Home/Home';
import Login from '../Login/Login';

//
// Class defintion 
//------------------------------------------------------------------
export default class Header extends Component {
    // Constructor
    //------------------------------------------
    state = {

    }

    // Life cycle methods
    //------------------------------------------

    // Local methods
    //------------------------------------------

    // render
    //------------------------------------------    
    render () {
        return (
            <Router>
               <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/user/" component={Home} />
               </div>
            </Router>
        )
    }
}