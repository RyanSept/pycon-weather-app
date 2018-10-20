import React, { Component, Fragment } from 'react';
import './App.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey50, pink200, pink300 } from 'material-ui/styles/colors';
import Grid from '@material-ui/core/Grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from 'material-ui/Dialog';

import getWeather from './api.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "owf-951",
      weather_state: null,
      location: "Nairobi, KE",
      temperature: null,
      showModal: false,
      phone: null,
    };
  }
  componentDidMount() {
    this.fetchWeather(this.state.location);
  }

  modalOpen = () => {
    this.setState({ showModal: true });
  }

  modalClose = () => {
    this.setState({ showModal: false });
  }

  fetchWeather = (city) => {
    let results = getWeather(city);
    this.setState({
      icon: `owf-${results.weather.id}`,
      weather_state: results.weather.main,
      temperature: results.temp,
      location: results.name,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      /> ,
    ];
    return (
      <MuiThemeProvider >
        <Fragment>
          <Grid container className="results">
            <Grid item xs={12}>
              <i className={`weather-icon owf ${this.state.icon}`}></i>
            </Grid>
            <Grid item xs={12} className="weather-details">
              <p id="temp">{this.state.temperature}ºC</p>
              <p id="location">{this.state.location}</p>
              <IconButton aria-label="Add your number" color="secondary"
                onClick={this.modalOpen}>
                <Icon style={{ color: "#54F2F2" }}>add_alert</Icon>
              </IconButton>
              <p id="weather-state">{this.state.weather_state}</p>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={0}>
            <Grid item xs={3}>
              <TextField
                floatingLabelText="Type in the city and hit enter"
                defaultValue={this.state.location}
                floatingLabelStyle={{ color: "#F4E04D", fontSize: "1em"}}
                underlineFocusStyle={{ borderColor: "#54F2F2" }}
                underlineStyle={{ borderColor: "#F4E04D" }}
                inputStyle={{ color: "#F4E04D", fontSize: "1.25em"}}
                style={{ color: "#F4E04D" }}
                onChange={this.handleTextInputChange}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter' && ev.target.value !== "") {
                    this.fetchWeather(ev.target.value);
                    ev.preventDefault();
                  }
                }}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Dialog
            title={`Subscribe to hourly weather alerts for ${this.state.location}`}
            modal={false}
            actions={actions}
            open={this.state.showModal}
            onRequestClose={this.modalClose}
            contentClassName="subscribe-modal"
          >
            <PhoneInput
              placeholder="Enter your phone number"
              value={this.state.phone}
              onChange={phone => this.setState({ phone })}
            />
          </Dialog>
        </Fragment>
      </MuiThemeProvider >
    );
  }
}

export default App;
