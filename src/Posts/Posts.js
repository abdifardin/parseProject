//
// by Fakhruddin Abdi, 27th Apr 2018
//------------------------------------------------------------------
import React, { Component } from 'react';
import {
    Button,
    ListGroupItem,
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

// locals
import s from './Posts.style';
import PostsStyle from './Posts.style';
import Loader from '../Loader/Loader';

//Posts stateless functions
const Posts =   ({posts, user}) => {
    const _posts = posts && posts.map((item, i) => {
        return (
            <ListGroupItem key={i} style={s.listGroup}>
                <Link style={s.listGruop_link} to={`post/${item.fbKey}`}>
                    <div style={s.content}>
                        <span style={s.label}>
                            Title:
                        </span>
                        {item.title}
                    </div>
                    <div>
                        <span style={s.label}>
                            Description:
                        </span>
                        {item.description}
                    </div>
                </Link>
                {
                  user && user.uid === item.uid ? 
                        <div>
                            <Button onClick={() => this.handleEdit(item)} color="info" style={s.edit}>edit</Button>
                            <Button onClick={() => this.handleRemove(item.fbKey)} color="danger">remove</Button>
                        </div>
                        : <div />
                }
            </ListGroupItem>
        )
    });

    return (
        <div style={s.root}>
            {_posts || <Loader /> }
        </div>
    )
}
;

export default Posts;