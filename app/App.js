import React, { Component } from 'react';
import {render} from 'react-dom';
import Greeting from './testComponents/Greeting';
import Clock from './testComponents/Clock';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class Home extends Component {
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

const About = () => (
    <h1>About me</h1>
);

const messages = {
    3: 'Hey, this is message 3',
    4: 'Well hey this is message 4'
};

class Message extends Component {
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

class Inbox extends Component {
    render(){
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children}
            </div>
        )
    }
}

const InboxStats = () => (
    <div>
        <h2>Stats</h2>
        <Link to="/inbox/messages/3">Hey</Link>
        <Link to="/inbox/messages/4">Yo</Link>
    </div>
);

class App extends Component {
  render(){
      return (
          <div>
              <Link to="/">Home</Link>
              <Link to="/inbox">Inbox</Link>
              <Link to="/about">About</Link>
              {this.props.children}
          </div>
      );
  }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox} >
                <IndexRoute component={InboxStats} />
                <Route path="messages/:id" component={Message} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('root')
);
