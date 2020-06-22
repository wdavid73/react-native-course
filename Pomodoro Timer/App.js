import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Vibration,
} from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: '25:00',
      workTime: '25:00',
      breakTime: '05:00',
      working: true,
      timer: null,
      paused: false,
      start: false,
      startButtonDisable: false,
      stopButtonDisable: true,
      resetButtonDisable: true,
      disabledInput: false,
    };
  }

  leftPadding = n => {
    if (parseInt(n) < 10) {
      return '0' + n.toString();
    } else {
      return n.toString();
    }
  };

  countdown = () => {
    if (this.state.currentTime === '00:00' && this.state.start === true) {
      console.log('finished');
      Vibration.vibrate();
      this.toggleStatus();
    } else {
      console.log('countdown init');
      let sec = this.state.currentTime.slice(3);
      let min = this.state.currentTime.slice(0, 2);
      if (sec === '00') {
        let newMin = this.leftPadding(parseInt(min) - 1);
        let newTime = newMin + ':59';
        this.setState({
          currentTime: newTime,
        });
      } else {
        let newSec = this.leftPadding(parseInt(sec) - 1);
        let newTime = min + ':' + newSec;
        this.setState({
          currentTime: newTime,
        });
      }
    }
  };

  toggleStatus() {
    if (this.state.working) {
      this.setState({
        working: false,
        currentTime: this.state.breakTime,
      });
    } else {
      this.setState({
        working: true,
        currentTime: this.state.workTime,
      });
    }
  }

  onStart = () => {
    if (this.state.paused === true || this.state.start === false) {
      this.setState({
        timer: setInterval(this.countdown, 1000),
        paused: false,
        start: true,
        stopButtonDisable: false,
        startButtonDisable: true,
        resetButtonDisable: false,
        disabledInput: true,
      });
    }
  };

  onStop = () => {
    if (this.state.paused === false && this.state.start === true) {
      clearInterval(this.state.timer);
      this.setState({
        paused: true,
        timer: null,
        start: false,
        startButtonDisable: false,
        stopButtonDisable: true,
        resetButtonDisable: true,
      });
    } else if (this.state.paused === true && this.state.start === false) {
      this.onStart();
    }
  };

  onReset = () => {
    this.onStop();
    this.setState({
      currentTime: this.state.workTime,
      start: false,
      paused: false,
      working: true,
      disabledInput: false,
    });
  };

  onChange = (value: string, name: string) => {
    console.log(value.length);
    if (value.length === 1) {
      let newValue = '0' + value + ':00';
      this.setState({
        [name]: newValue,
      });
    } else {
      this.setState({
        [name]: value + ':00',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttoms}>
          <Button
            title="Start"
            color="#2ecc71"
            onPress={() => this.onStart()}
            disabled={this.state.startButtonDisable}
          />
          <Button
            title="Stop"
            color="#34495e"
            onPress={() => this.onStop()}
            disabled={this.state.stopButtonDisable}
          />
          <Button
            title="Reset"
            color="#1abc9c"
            disabled={this.state.resetButtonDisable}
            onPress={() => this.onReset()}
          />
        </View>
        <View style={styles.textInput}>
          <Text style={{ fontSize: 15 }}>Time Start in Mins : </Text>
          <TextInput
            //keyboardType ="numeric"
            style={{ width: 50, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={value => this.onChange(value, 'currentTime')}
            disabled={this.state.disabledInput}
            maxLength={2}
          />
        </View>
        <View style={styles.textInput}>
          <Text style={{ fontSize: 15 }}>Time Break in Mins : </Text>
          <TextInput
            style={{ width: 50, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={value => this.onChange(value, 'breakTime')}
            disabled={this.state.disabledInput}
            maxLength={2}
          />
        </View>
        <View style={styles.fixText}>
          <Text style={{ fontSize: 25 }}>{this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  buttoms: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fixText: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
