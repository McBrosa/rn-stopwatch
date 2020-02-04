import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "../styles";
import { StyleSheet, Text, View } from "react-native";

export default class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      runningIntervalID: 0,
      prevLapTime: 0
    };
  }

  componentDidUpdate(prevProps) {
    const { running, reset, lap, addLapTime } = this.props;
    if (running !== prevProps.running) {
      this.run(running);
    }
    if (reset && reset !== prevProps.reset) {
      this.run(false);
      this.setState(() => ({
        time: 0,
        prevLapTime: 0
      }));
    }
    if (lap && lap !== prevProps.lap) {
      const { time, prevLapTime } = this.state;

      addLapTime({ value: this.displayDuration(time - prevLapTime) });
      this.setState(() => ({
        prevLapTime: time
      }));
    }
  }

  run(running) {
    let intervalID = this.state.runningIntervalID;
    if (running) {
      intervalID = setInterval(
        () =>
          this.setState(prevState => ({
            time: prevState.time + 1
          })),
        1000
      );
      this.setState(() => ({
        runningIntervalID: intervalID
      }));
    } else {
      clearInterval(intervalID);
    }
  }

  padDuration(number) {
    return `${number}`.length < 2 ? `0${number}` : number;
  }

  displayDuration(time) {
    const hours = this.padDuration(Math.floor(time / 3600));
    const minutes = this.padDuration(Math.floor((time % 3600) / 60));
    const seconds = this.padDuration(time % 60);
    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    return (
      <View>
        <Text style={styles.blueText}>
          {this.displayDuration(this.state.time)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blueText: {
    ...Typography.boldBlue
  }
});

StopWatch.propTypes = {
  running: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  addLapTime: PropTypes.func.isRequired,
  lap: PropTypes.bool.isRequired
};
