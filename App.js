import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import StopWatch from "./components/StopWatch";
import Lap from "./components/Lap";
import { Layouts, Buttons, Colors } from "./styles";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[Colors.darkPurp, Colors.lightPurp]}
          style={{ flex: 1 }}
        >
          <View style={styles.timeRow}>
            <StopWatch
              running={this.state.running}
              reset={this.state.reset}
              addLapTime={this.addLapTime}
              lap={lap}
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              style={styles.button}
              title="Reset"
              buttonStyle={styles.resetButton}
              onPress={this._onResetButtonPress}
            />
            <Button
              style={styles.button}
              icon={
                <Ionicons
                  name={running ? "md-pause" : "md-play"}
                  size={50}
                  color="white"
                />
              }
              buttonStyle={{
                backgroundColor: `${running ? Colors.amber : Colors.green}`,
                ...styles.pausePlayButton
              }}
              onPress={this._onStartStopButtonPress}
            />
            <Button
              style={styles.button}
              title={"Lap"}
              buttonStyle={styles.lapButton}
              disabled={!running}
              onPress={this._onLapButtonPress}
            />
          </View>
          <View style={styles.lapRow}>
            <Lap times={lapTimes} />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Layouts.app
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  timeRow: {
    flex: 2,
    justifyContent: "center"
  },
  lapRow: {
    flex: 4,
    marginTop: 10
  },
  pausePlayButton: {
    ...Buttons.squareButtonMedium,
    marginRight: 20
  },
  resetButton: {
    backgroundColor: Colors.charcoal,
    ...Buttons.squareButtonSmall,
    marginRight: 20
  },
  lapButton: {
    ...Buttons.squareButtonSmall,
    backgroundColor: Colors.charcoal
  }
});
