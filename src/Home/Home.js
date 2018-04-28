//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------
    
import React, { Component } from 'react';

// locals
import s from './Home.style';
import { getPosts, getAuthStatus } from '../Methods/firebaseQueries';
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
        getPosts('newPost', this.handleGetPosts);
        getAuthStatus((user) => {
            this.setState({
                user: user
            })
        });
    }

    // Local methods
    //------------------------------------------
    //handle get posts result
    handleGetPosts = (posts) => {
        //todo: console
        console.log('handle get posts', posts);
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