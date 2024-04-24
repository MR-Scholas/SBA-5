import React, {Component} from 'react';

export default class Sandwiches extends Component
{
    render()
    {
        const sandwich=this.props.sandwich
        return(
            <h1>ID: {sandwich.id}, Name: {sandwich.name}, Origin: {sandwich.origin}</h1>
        )
    }
}