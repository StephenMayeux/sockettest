import React, { Component } from 'react';
const socket = io.connect();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }

    this.onInit = this.onInit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  componentDidMount() {
    socket.on('init', this.onInit);
    socket.on('incrementCounter', this.incrementCounter)
  }

  onInit({ counter }) {
    this.setState({ counter });
  }

  handleIncrement() {
    let { counter } = this.state;
    counter++;
    this.setState({ counter });
    socket.emit('incrementCounter', counter);
  }

  incrementCounter({ counter }) {
    this.setState({ counter });
  }

  render() {
    return (
      <div className="container">
        <h1>The Counter</h1>
        <h2>{this.state.counter}</h2>
        <button
          onClick={this.handleIncrement}
          className="btn btn-primary"
        >
          Increment
        </button>
      </div>
    );
  }
}
