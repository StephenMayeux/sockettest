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
        <img
          className="trump"
          src="/public/trump.png"
          onClick={this.handleIncrement}
        />
        <h2>{`Trump has been shaken ${this.state.counter} times`}</h2>
      </div>
    );
  }
}
