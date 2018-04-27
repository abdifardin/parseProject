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
        this.setState({ collapse: !this.state.collapse });
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

        const _posts = posts && posts.map((item, i) => {
            //todo: console
            console.log('title', item.title);
            return (
            <ListGroupItem  key={i} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link style={{textDecoration: 'none', color: 'black'}} to={`post/${item.fbKey}`}>
                    {item.title}
                </Link>
                <div>
                    <Button onClick={() => this.handleEdit(item)} color="info" style={{margin: '0 3px'}}>edit</Button>
                    <Button onClick={() => this.handleRemove(item.fbKey)} color="danger">remove</Button>
                </div>
            </ListGroupItem>
            )
        })

        return (
            <div style={s.root}>
                <div style={{margin: 'auto'}}>
                    <div style={{ width: 500, textAlign: 'center' }}>
                        <Button color="primary" onClick={this.toggleModal} style={{ marginBottom: '1rem' }}> Create new post </Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Form ref="form" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
                                <FormGroup>
                                    <Input value={'slkjalsdf'} type="text" name="title" id="newPostTitle" placeholder="write your title here" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="description" id="newPostDescription" placeholder="write your description here" />
                                </FormGroup>
                                <FormGroup>
                                    <Input multipleLine type="textarea" name="postText" id="newPostText" placeholder="write your text here" />
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                        </Collapse>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: 20, padding: '10px 0' }}>
                        Posts by you
                    </div>
                    <ListGroup style={{ width: 500 }}>
                        {_posts || <div> you have no post yet</div>}
                    </ListGroup>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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