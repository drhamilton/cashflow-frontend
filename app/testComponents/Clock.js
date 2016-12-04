import React, { Component } from 'react';

class Clock extends Component {
    state = {
        date: new Date(),
        isToggleOn: true
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.setState({
            date: new Date()
        });
    };

    handleClick = () => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    };

    render() {
        let date = this.state.date.toLocaleTimeString();

        return (
            <div>
                <h1 className="header">{date}</h1>
                <button onClick={this.handleClick}>
                    { this.state.isToggleOn ? 'ON' : 'OFF' }
                </button>
            </div>
        )
    }
}

export default Clock;