import React, {Component} from 'react';
import '../App.css';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timerOn: false,
            previousLapTime: 0,
            numLaps: 0,
            lapTimes: [],
        };

    }
    wrapperStartFunction = () =>{
        this.startTimer()
        this.lapTimer()
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

    lapTimer = () => {
        this.setState({
            lapTimes: this.state.lapTimes.concat(this.state.time - this.state.previousLapTime),
            previousLapTime: this.state.time,
            numLaps: this.state.numLaps + 1,
        })
    }

    resetTimer = () => {
        this.setState({
            time: 0,
            previousLapTime: 0,
            numLaps: 0,
            lapTimes: [],
        });
    };

    render() {
        const {time} = this.state;
        const lapTimes = this.state.lapTimes;
        let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);

        const laps = lapTimes.map((step, lap) => {
            let lapCentiseconds = ("0" + (Math.floor(step / 10) % 100)).slice(-2);
            let lapSeconds = ("0" + (Math.floor(step / 1000) % 60)).slice(-2);
            let lapMinutes = ("0" + (Math.floor(step / 60000) % 60)).slice(-2);
            let lapHours = ("0" + Math.floor(step / 3600000)).slice(-2);

            const desc = lap ?
                'Lap #' + lap+"  "+lapHours+":"+lapMinutes+":"+lapSeconds+":"+lapCentiseconds:
                'Laps';
            return (
                <div className="lap-display">
                    <li key={lap}>
                        <p className="laps">{desc}</p>
                    </li>
                </div>

            );
        });
        return (
            <div className="Stopwatch">
                <div className="Stopwatch-header">Stopwatch</div>
                <div className="Stopwatch-display">
                    {hours} : {minutes} : {seconds} : {centiseconds}
                </div>
                {this.state.timerOn === false && this.state.time === 0 && (
                    <button onClick={this.wrapperStartFunction} >Start</button>
                )}
                {this.state.timerOn === true && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {this.state.timerOn === true && (
                    <button onClick={this.lapTimer}>Lap</button>
                )}
                {this.state.timerOn === false && this.state.time > 0 && (
                    <button onClick={this.startTimer}>Resume</button>
                )}
                {this.state.timerOn === false && this.state.time > 0 && (
                    <button onClick={this.resetTimer}>Reset</button>
                )}
                <ul>{laps}</ul>
            </div>
    )


    }
}

export default Stopwatch;
