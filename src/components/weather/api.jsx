import React, { Component } from "react";
import Loader from "../loader";

class WeatherAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null
    };
    this.requestData = this.requestData.bind(this);
  }

  requestData(props = this.props) {
    const city = props.city;
    if (city.lat) {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${
        city.lat
      }&lon=${city.lon}&appid=b1b35bba8b434a28a0be2a3e1071ae5b`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({ weatherData: json });
        });
    } else {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${
      city.name
    }&appid=b1b35bba8b434a28a0be2a3e1071ae5b&&units=metric`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
    }
  }

  componentDidMount() {
    this.requestData();
  }

  componentWillReceiveProps(props) {
    this.requestData(props);
  }

  render() {
    const { weatherData } = this.state;
    if (!weatherData || !weatherData.weather)
      return (
        <div>
          <Loader />
        </div>
      );
    const weather = weatherData.weather[0];
    const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
    return (
      <div className="weather__container">
        <h1 className="weather__title">
          {weather.main} in{" "}
          <span className="weather__title-sity">{weatherData.name}</span>,{" "}
          <span className="weather__title-country">
            {weatherData.sys.country}
          </span>
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current temp: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

export default WeatherAPI;
