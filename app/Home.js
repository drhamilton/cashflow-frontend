import React, { Component } from 'react';

import Greeting from './testComponents/Greeting';
import Clock from './testComponents/Clock';

export default class Home extends Component {
    state = {
        text: ''
    };

    handleTextChange = (value) => {
        this.setState({ text: value });
    };

    render(){
        let text = this.state.text;
        return (
            <div>
                <h1>Welcome Home</h1>
                <Clock />
                <Greeting onChange={this.handleTextChange} text={text} />
            </div>
        )
    }
}