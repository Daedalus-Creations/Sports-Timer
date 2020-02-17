import React, {Component} from 'react';
import '../App.css';

class Timer extends Component {

    constructor(props){
        super(props);
        this.state = {
            time : "00:05:00:00",
            timerOn: false,
            default: "00:05:00:00"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    startTimer = () => {
        if(isNaN(this.parseTime(this.state.time))) {
        }
        else {
            this.setState({
                timerOn: true,
                time: this.state.time,
                default: this.state.time,
            });
            this.timer = setInterval(() => {
                const numericalTime = this.parseTime(this.state.time) - 10;
                if (numericalTime >= 0){
                    this.setState({
                        time: this.timeToString(numericalTime),
                })
                } else {
                        clearInterval(this.timer);
                        this.setState({ timerOn: false });
                        alert("Countdown ended");
                    }


            }, 10);
        }
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
            time: this.state.default,
            timerOn: this.state.timerOn,
        });
    };
    timeToString = (time) =>{
        let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        let text = ""+hours+":"+minutes+":"+seconds+":"+centiseconds;
        return text;
    };
    parseTime = (time) => {
        let hms = time.split(":");
        return hms[0] * 3600000 + hms[1] * 60000 + hms[2] * 1000 + hms[3]*10;
    };

    handleChange(event) {
        this.setState({time: event.target.value});
    }

    render() {
        return (
            <div className="Timer">
                <div className="Timer-header">Timer</div>
                <div className="Timer-display">
                    <textarea className="Timer-box" disabled={this.state.timerOn} value={this.state.time} onChange={this.handleChange} />
                </div>
                {this.state.timerOn === false && (
                    <button onClick={this.startTimer}>Start</button>
                )}
                {this.state.timerOn === true && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {this.state.timerOn === false && (
                    <button onClick={this.resetTimer}>Reset</button>
                )}
            </div>
        );
    }
}
export default Timer;
