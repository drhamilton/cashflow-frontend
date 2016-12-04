import React, { Component } from 'react';

class Greeting extends Component {
    handleChange = e => {
        this.props.onChange(e.target.value);
    };

    render() {
        let { text } = this.props;

        return (
            <div>
                <input type="text" value={text} onChange={this.handleChange} />
            </div>
        )
    }
}

export default Greeting