//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Collapse,
    UncontrolledDropdown} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

// locals
import s from './Header.style';
import { logOutUser } from '../Methods/firebaseQueries';
import Login from '../Login/Login'
import UserPage from '../UserPage/UserPage';
import Search from '../Search/Search';

//
// Class defintion 
//------------------------------------------------------------------
export default class Header extends Component {
    // Constructor
    //------------------------------------------
    state = {
        user: null,
        dropdownOpen: false
    }

    // Life cycle methods
    //------------------------------------------
    componentWillMount() {
        this.setState({
            user: this.props.user,
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
        logOutUser();
    };



    // render
    //------------------------------------------    
    render () {
        const { goToUserPage, user } = this.state;
        return (
            <div style={s.root}>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Pars project</NavbarBrand>
                <div style={s.search} >
                   <Search />
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
                                            <DropdownMenu >
                                                <DropdownItem onClick={this.handleLogout}>
                                                    logout
                                                </DropdownItem>
                                                <DropdownItem header>
                                                    <Link style={s.userPage} to="/user">
                                                     user page
                                                    </Link>
                                                </DropdownItem>
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