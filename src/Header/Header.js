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
    Input,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';

// locals
import s from './Header.style';
import { logOutUser } from '../Methods and Constatns/firebaseQueries';
import Login from '../Login/Login'
//
// Class defintion 
//------------------------------------------------------------------
export default class Header extends Component {
    // Constructor
    //------------------------------------------
    state = {
        user: null,
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
        if (oldId !== newId){
            this.setState({
                user: nextProps.user
            })
        }
    }

    // Local methods
    //------------------------------------------
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    
    //Handle logout
    handleLogout= () => {
        //todo: console
        console.log('handle logout');
        logOutUser();
    };

    // render
    //------------------------------------------    
    render () {
        const { modal, user } = this.state;
        return (
            <div style={s.root}>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Pars project</NavbarBrand>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10 0' }} >
                    <Form style={{ width: '50%', position: 'relative', top: '10px' }}>
                        <FormGroup>
                            <Input type="text" name="search" placeholder="search here" />
                        </FormGroup>
                    </Form>
                </div>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/login">
                                {
                                    user ? 
                                        <UncontrolledDropdown>
                                            <DropdownToggle onClick={(e) => { e.preventDefault() }} caret>
                                                { user.email}
                                            </DropdownToggle>
                                            <DropdownMenu onClick={this.handleLogout} right>
                                                <DropdownItem header>logout</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        
                                        : 
                                        <div onClick={ this.handleLogin }>
                                            Login
                                        </div>
                                }
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
              </Navbar>
            </div>
        )
    }
}