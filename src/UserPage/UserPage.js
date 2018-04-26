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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Input,
    DropdownItem,
    ListGroup,
    ListGroupItem} from 'reactstrap';

// locals
import s from './UserPage.style';
import { logOutUser, getPosts, newPost, deletePost } from '../Methods and Constatns/firebaseQueries';
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
        const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            text: e.target.postText.value,
        }

        newPost(data, () => { console.log('something')});
    };

    //Handle edit
    handleEdit= () => {
    };

    //Handle remove
     handleRemove= (fbKey) => {
         deletePost(fbKey);
    };

    // render
    //------------------------------------------    
    render () {
        const { user, posts } = this.state;

        const _posts = posts && posts.map((item, i) => {
            //todo: console
            console.log('title', item.title);
            return (
            <ListGroupItem key={i} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {item.title}
                </div>
                <div>
                    <Button onClick={() => this.handleEdit(item.fbKey)} color="info" style={{margin: '0 3px'}}>edit</Button>
                    <Button onClick={() => this.handleRemove(item.fbKey)} color="danger">remove</Button>
                </div>
            </ListGroupItem>
            )
        })

        //todo: console
        console.log('list', _posts);
        return (
            <div style={s.root}>
                <div style={{margin: 'auto'}}>
                    <div style={{ width: 500, textAlign: 'center' }}>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}> Create new post </Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Form ref="form" onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
                                <FormGroup>
                                    <Input type="text" name="title" id="newPostTitle" placeholder="write your title here" />
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
                        Posts list by you
                    </div>
                    <ListGroup style={{ width: 500 }}>
                        {_posts || <div> you have no post yet</div>}
                    </ListGroup>
                </div>
            </div>
        )
    }
}