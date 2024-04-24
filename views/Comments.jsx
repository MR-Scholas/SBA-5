import React, {Component} from 'react';
//import './style.css'

export default class Comments extends Component
{
    render()
    {
        const comment=this.props.comment
        return(
            <h1>{comment.name} says "{comment.content}"</h1>
        )
    }
}