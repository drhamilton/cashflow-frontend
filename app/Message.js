import React, { Component } from 'react';

import messages from './data/messages';

export default class Message extends Component {
    state = {
        message: ''
    };

    fetchMessage = (id) => {
        return new Promise(function(resolve, reject){
            let message = messages[id];

            resolve(message);
        })
    };

    componentDidMount() {
        const id = this.props.params.id;

        this.fetchMessage(id)
            .then(message => {
                this.setState({ message: message })
            })
            .catch( message => {
                console.log(message);
            })
    }

    render(){
        let { message } = this.state;
        return (
            <h3>{message}</h3>
        )
    }
}
