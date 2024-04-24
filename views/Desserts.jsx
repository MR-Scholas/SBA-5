import React, {Component} from 'react';

export default class Desserts extends Component
{
    render()
    {
        const dessert=this.props.dessert
        return(
            <h1>ID: {dessert.id}, Name: {dessert.name}, Featured: {dessert.featured}</h1>
        )
    }
}