import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import { pink } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import getWeather from './api.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "owf-951",
      weather_state: null,
      location: "Nairobi, KE",
      temperature: null,
    };
  }
  componentDidMount() {
    this.fetchWeather(this.state.location);
  }

  fetchWeather = (city) => {
    let results = getWeather(city);
    this.setState({
      icon: `owf-${results.weather.id}`,
      weather_state: results.weather.main,
      temperature: results.temp,
      location: results.name
    });
  }

  render() {
    return (
      <div className="App">
        <Grid container className="App-header">
          <i className={`weather-icon owf ${this.state.icon}`}></i>
          <Grid item xs={12} className="weather-details">
            <p>{this.state.temperature}ºC</p>
            <p>{this.state.location}</p>
            <p>{this.state.weather_state}</p>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xs={11}>
                <TextField
                  label="Type in the city and hit enter"
                  defaultValue={this.state.location}
                  style={{ color: "white" }}
                  onChange={this.handleTextInputChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter' && ev.target.value !== "") {
                      this.fetchWeather(ev.target.value);
                      ev.preventDefault();
                    }
                  }}
                // fullWidth={true}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton color="secondary" aria-label="Add an alarm">
                  <Icon>🔔</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
