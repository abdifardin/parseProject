//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
    
import React, { Component } from 'react';

// locals
import s from './Home.style';
import { getPosts } from '../Methods/firebaseQueries';
import Posts from '../Posts/Posts';
//
// Class defintion 
//------------------------------------------------------------------
export default class Home extends Component {
    // Constructor
    //------------------------------------------
    state = {
        posts: null,
        user: null
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
        if (oldId !== newId) {
            getPosts('newPost', this.handleGetPosts);
            this.setState({
                user: nextProps.user
            })
        }
    }

    // Local methods
    //------------------------------------------
    //handle get posts result
    handleGetPosts = (posts) => {
        this.setState({
            posts
        })
    };


    // render
    //------------------------------------------    
    render () {
        const { posts } = this.state;
        return (
            <div style={s.root}>
                <div style={s.title}>
                    This is a home page where we list all posts
                </div>
                 <Posts posts={posts} />
            </div>
        )
    }
}