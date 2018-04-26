//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
    
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// locals
import s from './Login.style';
import { createUser } from '../Methods and Constatns/firebaseQueries';
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
    //Handle submit
    handleSubmit= (e) => {
        e.preventDefault();
        
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        //todo: console
        console.log('data', data);
        createUser(this.hanelSubmitResult, data);
        
    };

    //handle submit result
    hanelSubmitResult= (user, mode) => {
        if ( mode === 'success')
            this.setState({user})
    };

    // render
    //------------------------------------------    
    render () {
        return (
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 50}}>
                <Form  onSubmit={this.handleSubmit} style={{width: '500px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd'}}>
                    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input  type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>   
                    <Button>Sign up or Sign in</Button>
                </Form>
            </div>
        )
    }
}