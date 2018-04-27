//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

import React, { Component } from 'react';

// locals 
import s from './Footer.style';
//
// Class defintion 
//------------------------------------------------------------------
export default class Footer extends Component {
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
            <div style={s.root}>
                <span style={s.container}> @Pars 201 </span>
            </div>
        )
    }
}