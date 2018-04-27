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
import { Link } from 'react-router-dom';


// locals
import s from './UserPage.style';
import Posts from '../Posts/Posts';
import Loader from '../Loader/Loader';
import { logOutUser, getPosts, newPost, deletePost } from '../Methods/firebaseQueries';
import Login from '../Login/Login'
import { SSL_OP_ALL } from 'constants';

//
// Class defintion 
//------------------------------------------------------------------
export default class UserPage extends Component {
    // Constructor
    //------------------------------------------
    state = {
        user: null,
        collapse: false,
        modal: false,
        postEdit: {},
        post: []
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
            getPosts('userPost', this.handleGetPosts);
            this.setState({
                user: nextProps.user
            })
        }
    }

    // Local methods
    //------------------------------------------
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //handle get posts result
    handleGetPosts= (posts) => {
        //todo: console
        console.log('posts', posts);
        this.setState({
          posts: posts
        })
    };

    //handleSubmit
    handleSubmit= (e) => {
        e.preventDefault();
        const { postEdit } = this.state;
        const fbKey = postEdit.fbKey;
        const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            text: e.target.postText.value,
        }


        newPost(data,  fbKey);
        this.setState({
            postEdit: false,
            modal: false
        })
        console.log('something')
    };

    //Handle edit
    handleEdit= (post) => {
        this.setState({
          postEdit: post,
          modal: true
        })
    };

    //Handle remove
     handleRemove= (fbKey) => {
         deletePost(fbKey);
    };

    // render
    //------------------------------------------    
    render () {
        const { user, posts, postEdit } = this.state;
        return (
            <div style={s.root}>
                <div style={{margin: 'auto'}}>
                    <div style={{ width: 500, textAlign: 'center' }}>
                        <Button color="primary" onClick={this.toggleModal} style={{ marginBottom: '1rem' }}> Create new post </Button>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: 20, padding: '10px 0' }}>
                        Posts by you
                    </div>
                    <ListGroup style={{ width: 500 }}>
                        {
                            posts 
                                ? <Posts posts={posts} />
                                : <Loader />
                        }
                    </ListGroup>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>{postEdit ? 'Add new post' : 'Edit the post'} </ModalHeader>
                        <Form ref="form" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
                            <FormGroup>
                                <Input defaultValue={postEdit.title} type="text" name="title" id="newPostTitle" placeholder="write your title here" />
                            </FormGroup>
                            <FormGroup>
                                <Input defaultValue={postEdit.description} type="text" name="description" id="newPostDescription" placeholder="write your description here" />
                            </FormGroup>
                            <FormGroup>
                                <Input defaultValue={postEdit.text} multipleLine type="textarea" name="postText" id="newPostText" placeholder="write your text here" />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                </Modal>
            </div>
        )
    }
}