import React, { Component } from 'react';

class WeatherAPI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherData: null,
        }
    }

    requestData(props = this.props) {
        const city = props.city;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&&units=metric`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ weatherData: json });
            });
    }

    componentDidMount() {
        this.requestData();
    }

    componentWillReceiveProps(props) {
        this.requestData(props);
    }

    render() {
        const { weatherData } = this.state;
        if (!weatherData || !weatherData.weather) return <div>Loading</div>
        const weather = weatherData.weather[0];
        const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
        return (
            <div className="weather__container">
                <h1 className="weather__title">
                    {weather.main} in {this.props.city}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Current temp: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
            </div>
        );
    };
};

export default WeatherAPI;