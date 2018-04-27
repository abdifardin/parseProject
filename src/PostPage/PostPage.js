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
    Button,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    DropdownItem,
    ListGroup,
    ListGroupItem} from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';

// locals
import s from './PostPage.style';
import { logOutUser, getPosts, newPost, deletePost, getAPost } from '../Methods/firebaseQueries';
import Login from '../Login/Login'
import { SSL_OP_ALL } from 'constants';
//
// Class defintion 
//------------------------------------------------------------------
export default withRouter(class PostPage extends Component {
    // Constructor
    //------------------------------------------
    state = {
        post: {
            title: '',
            description: '',
            text: ''
        }
    }

    // Life cycle methods
    //------------------------------------------
    componentWillMount() {
        const fbKey = this.props.location.pathname.split('/')[2];
        getAPost(this.handleGetPost, fbKey)
    }

    // Local methods
    //------------------------------------------
    //Handle get post result
    handleGetPost= (post) => {
        this.setState({
          post: post
        })
    };


    // render
    //------------------------------------------    
    render () {
        const { post } = this.state;
        return (
            <div style={s.root}>
               <div style={s.container}>
                    <span> Title </span>
                    <div style={s.postSection}>
                        {post.title}
                    </div>
                    <span> description </span>
                    <div style={s.postSection}>
                        {post.description}
                    </div>
                    <span> text </span>
                    <div style={s.postSection}>
                            {post.text}
                    </div>
                </div>
            </div>
        )
    }
})