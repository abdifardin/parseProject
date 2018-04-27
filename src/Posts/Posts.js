//
// by Fakhruddin Abdi, 27th Apr 2018
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
    Button,
    ListGroupItem,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

// locals
import s from './Posts.style';
import PostsStyle from './Posts.style';

//Posts stateless functions
const Posts =   ({posts}) => {
    const _posts = posts && posts.map((item, i) => {
        return (
            <ListGroupItem key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`post/${item.fbKey}`}>
                    {item.title}
                </Link>
                <div>
                    <Button onClick={() => this.handleEdit(item)} color="info" style={{ margin: '0 3px' }}>edit</Button>
                    <Button onClick={() => this.handleRemove(item.fbKey)} color="danger">remove</Button>
                </div>
            </ListGroupItem>
        )
    });

    return (
        <div>
            { _posts }
        </div>
    )
}
;

export default Posts;