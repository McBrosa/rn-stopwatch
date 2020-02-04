import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import StopWatch from "./components/StopWatch";
import Lap from "./components/Lap";
import { Layouts, Buttons } from "./styles";
import { Button } from "react-native-elements";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      reset: false,
      lapTimes: [],
      lap: false
    };

    this._onStartStopButtonPress = this._onStartStopButtonPress.bind(this);
    this._onResetButtonPress = this._onResetButtonPress.bind(this);
    this._onLapButtonPress = this._onLapButtonPress.bind(this);
    this.addLapTime = this.addLapTime.bind(this);
  }

  _onStartStopButtonPress() {
    this.setState(previousState => ({
      running: !previousState.running,
      reset: false
    }));
  }

  _onResetButtonPress() {
    this.setState(() => ({
      running: false,
      reset: true,
      lapTimes: []
    }));
  }

  _onLapButtonPress() {
    this.setState(() => ({
      lap: true
    }));
  }

  addLapTime(lapTime) {
    this.setState(prevState => ({
      lapTimes: [lapTime, ...prevState.lapTimes],
      lap: false
    }));
  }

  render() {
    const { running, lap, lapTimes } = this.state;

    return (
      <View style={styles.container}>
        <StopWatch
          running={this.state.running}
          reset={this.state.reset}
          addLapTime={this.addLapTime}
          lap={lap}
        />
        <View style={styles.buttonRow}>
          <Button
            style={styles.button}
            title={running ? "Stop" : "Start"}
            onPress={this._onStartStopButtonPress}
          />
          <Button
            style={styles.button}
            title="Reset"
            onPress={this._onResetButtonPress}
          />
          <Button
            style={styles.button}
            title="Lap"
            onPress={this._onLapButtonPress}
          />
        </View>
        <Lap times={lapTimes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Layouts.app
  },
  buttonRow: {
    ...Layouts.spacedRow
  },
  button: {
    ...Buttons.margin
  }
});
