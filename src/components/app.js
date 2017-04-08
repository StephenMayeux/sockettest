import React, { Component } from 'react';
import Draggable from 'react-draggable';
const socket = io.connect();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      activeDrags: 0
    }

    this.onInit = this.onInit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
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

  onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      <div className="container">
        <h1>The Counter</h1>
        <Draggable {...dragHandlers}>
          <div>
            <img
              draggable="false"
              className="trump"
              src="/public/trump.png"
              onClick={this.handleIncrement}
            />
          </div>
        </Draggable>
        <h2>{`Trump has been shaken ${this.state.counter} times`}</h2>
      </div>
    );
  }
}
