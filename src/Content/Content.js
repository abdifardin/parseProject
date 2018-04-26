//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


// locals
import s from './Content.style';

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
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 50}}>
                <Form style={{width: '500px', backgroundColor: '#eaeaea', padding: '20px', borderRadius: '10px'}}>
                    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>   
                    <Button>Submit</Button>
                 </Form>
            </div>
        )
    }
}