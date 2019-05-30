/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Forecast from "./Forecast.js"
import OpenWeatherMap from "./OpenWeatherMap.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null }
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    //console.log(zip);
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      //console.log(forecast);
      this.setState({ zip: zip, forecast: forecast });
    });
  };

  render() {

    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }

    return (
      <View
        style={styles.container}>

        <Text
          style={styles.welcome}>
          Selected {this.state.zip}
        </Text>
        {content}
        <TextInput
          style={styles.input}
          onSubmitEditing={this._handleTextChange}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#666666"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    padding: 2,
    height: 40,
    width: 100,
    textAlign: "center"
  },
});

export default App;