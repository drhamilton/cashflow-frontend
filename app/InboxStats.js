import React, { Component } from 'react';
import { Link } from 'react-router'

export default class InboxStats extends Component {
    state = {};

    render() {
        return (
            <div>
                <h2>Stats</h2>
                <ul>
                    <li><Link to="/inbox/messages/3">Hey</Link></li>
                    <li><Link to="/inbox/messages/4">Yo</Link></li>
                </ul>
            </div>
        )
    }
}