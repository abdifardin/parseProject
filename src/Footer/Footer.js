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
            <div style={{width: '100%', position: 'absolute', bottom: 0, left: 0,  borderTop: '1px solid #ddd', backgroundColor: '#666', color: 'white', textAlign: 'center', height: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                @Pars 2018
            </div>
        )
    }
}