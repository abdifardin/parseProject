//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
    
import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Form,
    FormGroup,
    Label,
    Input} from 'reactstrap';

// locals
import s from './Header.style';
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
            <div style={s.root}>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Pars project</NavbarBrand>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '10 0'}} >
                   <Form style={{width: '50%', position: 'relative', top: '10px'}}>
                        <FormGroup>
                        <Input type="text" name="search"  placeholder="search here" />
                        </FormGroup>
                    </Form>
                </div>
              </Navbar>
            </div>
        )
    }
}