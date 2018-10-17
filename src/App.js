import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey50, pink300 } from 'material-ui/styles/colors';
import { getWeather } from './api.js';

class App extends Component {
  componentDidUpdate(prevProps) {
    this.setState()
  }
  render() {
    return (
      <MuiThemeProvider >
        <div className="App">
          <header className="App-header">
            <i className="weather-icon owf owf-522 owf-5x"></i>
            <TextField
              floatingLabelText="Type in the city and hit enter"
              defaultValue="Nairobi"
              floatingLabelStyle={{ color: pink300 }}
              inputStyle={{ color: pink300 }}
              style={{ color: "white" }}
              // fullWidth={true}
            />
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
