import React, {Component} from 'react';
import '../App.css';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timerOn: false,
        };

    }

    startTimer = () => {
        this.setState({
            timerOn: true,
            time: this.state.time,
        });
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 10
            });
        }, 10);
    };

    stopTimer = () => {
        this.setState({
            timerOn: false,
            time: this.state.time
        });
        clearInterval(this.timer)
    };

    resetTimer = () => {
        this.setState({
            time: 0
        });
    };

    render() {
        const { time } = this.state;
        let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return (
            <div className="Stopwatch">
                <div className="Stopwatch-header">Stopwatch</div>
                <div className="Stopwatch-display">
                    {hours} : {minutes} : {seconds} : {centiseconds}
                </div>
                {this.state.timerOn === false && this.state.time === 0 && (
                    <button onClick={this.startTimer}>Start</button>
                )}
                {this.state.timerOn === true && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {this.state.timerOn === false && this.state.time > 0 && (
                    <button onClick={this.startTimer}>Resume</button>
                )}
                {this.state.timerOn === false && this.state.time > 0 && (
                    <button onClick={this.resetTimer}>Reset</button>
                )}
            </div>
        );
    }
}
export default Stopwatch;
