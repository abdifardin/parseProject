//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
    
import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    ListGroup,
    Button,
    Nav,
    NavItem,
    Modal,
    ModalBody,
    ModalHeader,
    Input} from 'reactstrap';
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
        this.setState({
          posts
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
                <div style={s.container}>
                    <div style={s.newPost_div}>
                        <Button color="primary" onClick={this.toggleModal} style={s.newPost}> Create new post </Button>
                    </div>
                    <div style={s.title}>
                        Posts by you
                    </div>
                    <ListGroup style={s.ListGroup}>
                        {
                            posts 
                                ? <Posts posts={posts} user={user} />
                                : <Loader />
                        }
                    </ListGroup>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>{postEdit ? 'Add new post' : 'Edit the post'} </ModalHeader>
                        <Form ref="form" onSubmit={this.handleSubmit} style={s.form}>
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