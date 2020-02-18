import React, {Component} from 'react';
import '../App.css';

class Stopwatch extends Component {
    /*
    Constructor for the stopwatch
    Initializes variables
     */
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
    /*
    Simple wrapper function to allow for one button to call two functions
     */
    wrapperStartFunction = () =>{
        this.startTimer();
        this.lapTimer()
    };

    /*
    Function to start the timer
     */
    startTimer = () => {
        //Change states
        this.setState({
            timerOn: true,
            time: this.state.time,
        });
        //Begin counting up
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 10
            });
        }, 10);
    };

    /*
    Function to stop the timer
     */
    stopTimer = () => {
        //Changes states
        this.setState({
            timerOn: false,
            time: this.state.time
        });
        //Stops the timer
        clearInterval(this.timer)
    };

    /*
    Function for stopwatch laps
     */
    lapTimer = () => {
        this.setState({
            //Calculates the time elapsed since last lap
            lapTimes: this.state.lapTimes.concat(this.state.time - this.state.previousLapTime),
            //Updates state
            previousLapTime: this.state.time,
            //Increments count
            numLaps: this.state.numLaps + 1,
        });

        for(var i = 0;i<100;i++)
            setTimeout(() =>{window.scrollBy(0,1)},1);
    };

    /*
    Function to restart the timer
     */
    resetTimer = () => {
        this.setState({
            //Resets all variables, including clearing laps
            time: 0,
            previousLapTime: 0,
            numLaps: 0,
            lapTimes: [],
        });
    };

    /*
    Function to render the stopwatch
     */
    render() {
        //Gets some variables
        const {time} = this.state;
        const lapTimes = this.state.lapTimes;

        //Converts numerical time into readable times
        let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);

        //Begin creating auto-updating lap list
        const laps = lapTimes.map((step, lap) => {
            //Converts numerical time into readable time (for laps)
            let lapCentiseconds = ("0" + (Math.floor(step / 10) % 100)).slice(-2);
            let lapSeconds = ("0" + (Math.floor(step / 1000) % 60)).slice(-2);
            let lapMinutes = ("0" + (Math.floor(step / 60000) % 60)).slice(-2);
            let lapHours = ("0" + Math.floor(step / 3600000)).slice(-2);

            //Create text for each element of list
            const desc = lap ?
                'Lap #' + lap+"  "+lapHours+":"+lapMinutes+":"+lapSeconds+":"+lapCentiseconds:
                'Laps';
            //Updates a list with each list element with the description for each lap
            return (
                <div className="laps">
                    <li key={lap}>
                        <p>{desc}</p>
                    </li>
                </div>

            );
        });
        //Display for main timer
        return (
            <div className="Stopwatch">
                <div className="Stopwatch-header">Stopwatch</div>
                <div className="Stopwatch-display">
                    <div className="Stopwatch-box">
                        {hours}:{minutes}:{seconds}:{centiseconds}
                    </div>
                </div>
                {/*Determines which button are shown, as well was what buttons do */}
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
                {/*Also displays the list of laps*/}
                <ul>{laps}</ul>
            </div>
    )


    }
}

export default Stopwatch;
