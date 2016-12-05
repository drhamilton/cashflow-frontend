import React, { Component } from 'react';
import {render} from 'react-dom';

import './main.css';
import styles from './App.css';

import Home from './Home';
import Inbox from './Inbox';
import InboxStats from './InboxStats';
import Message from './Message';

import transactionData from './data/expenses';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class Transaction extends Component {
    render() {
        let {category, amount, description} = this.props;
        return (
            <tr>
                <td>{amount}</td>
                <td>{category}</td>
                <td>{description}</td>
            </tr>
        )
    }
}

class TransactionList extends Component {
    render() {
        let { transactions } = this.props;

        let list = transactions.map(transaction => {
            return <Transaction {...transaction} />
        });

        return (
            <table>
                <tbody>{list}</tbody>
            </table>
        );
    }
}

class TransactionControls extends Component {
    state = {
        amount: '',
        category: 'savings',
        description: ''
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);
    };

    handleChange = (name, e) => {
        let update = {};
        update[name] = e.target.value;

        this.setState(update);
    };

    handleCategoryChange = (e) => {
        this.setState({ category: e.target.value });
    };

    render() {
        let { amount, category, description } = this.state;

        return (
            <form className={styles.addTransaction} onSubmit={this.handleSubmit}>
                <label htmlFor="amount">
                    Amount
                    <input type="text" name="amount" value={amount} onChange={this.handleChange.bind(this, 'amount')} />
                </label>

                <label htmlFor="category">
                    Category
                    <select value={category} onChange={this.handleCategoryChange} name="category">
                        <option value="savings">Savings</option>
                        <option value="groceries">Groceries</option>
                        <option value="fig">Fig</option>
                    </select>
                </label>

                <label htmlFor="description">
                    Description
                    <input type="text" name="description" value={description} onChange={this.handleChange.bind(this, 'description')} />
                </label>

                <input type="submit" value="Add Transaction"/>
            </form>
        )

    }
}

class TransactionContainer extends Component {
    state = {
        transactions: []
    };

    componentDidMount() {
        this.handleGetTransactions();
    }

    handleGetTransactions = () => {
        this.getTransactions()
            .then(this.setTransactions)
            .catch(this.handleError)
    };

    getTransactions = () => {
        return new Promise(function(resolve, reject){
            resolve(transactionData);
        })
    };

    setTransactions = (transactions) => {
        this.setState({ transactions });
    };

    handleError = (err) => {
        console.log(err);
    };

    addTransaction = (transaction) => {
        transaction.key = Math.round(Math.random() * (10000 - 1) + 1);
        transactionData.push(transaction);

        this.handleGetTransactions();
    };

    render() {
        return (
            <div className={styles.transactionContainer}>
                <TransactionControls onSubmit={this.addTransaction} />
                <TransactionList transactions={this.state.transactions} />
            </div>
        )
    }
}

class App extends Component {
  render(){
      return (
          <div>
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/transactions">Transactions</Link></li>
                  <li><Link to="/inbox">Inbox</Link></li>
              </ul>
              {this.props.children}
          </div>
      );
  }
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="transactions" component={TransactionContainer} />
            <Route path="inbox" component={Inbox} >
                <IndexRoute component={InboxStats} />
                <Route path="messages/:id" component={Message} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('root')
);
