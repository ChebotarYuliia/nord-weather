import React, { Component } from "react";
import Cities from "./cities&search";
import WeatherAPI from "./api";
import Autocomplete from "react-google-autocomplete";
import { Container, Row, Col } from "reactstrap";
import "./style.css";

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      currentLocation: {},
      cities: [{ name: "Kharkiv" }]
    };
    this.setCurrentLocationIndex = this.setCurrentLocationIndex.bind(this);
    this.handleDeleteCity = this.handleDeleteCity.bind(this);
  }

  setCurrentLocationIndex = newIndex => {
    const index = newIndex;
    let { currentLocation } = this.state;
    currentLocation = this.state.cities[index];
    this.setState({
      currentLocation
    })
  };

  handleSearchSubmit(place) {
    const cities = [...this.state.cities];
    cities.push({ name: place.name });
    this.setState({
      cities
    });
  }

  handleDeleteCity = city => {
    let filteredCities = this.state.cities.filter(function(item) {
      return item.name !== city;
    });
    this.setState({
      cities: filteredCities
    });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = pos => {
        const crd = pos.coords;
        const { currentLocation } = this.state;
        currentLocation.lat = crd.latitude;
        currentLocation.lon = crd.longitude;
        this.setState({
          currentLocation
        });
      };

      const error = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {
    const { currentLocation } = this.state;
    return (
      <div>
        <Container onClick={this.getCurrentPosition}>
          <Row>
            <Col xs="12" sm="6">
              <div className="cities-container">
                <h1 className="cities-container__title">Choose a city</h1>
                <Autocomplete
                  id="searchInput"
                  onPlaceSelected={place => {
                    this.handleSearchSubmit(place);
                  }}
                  types={["(regions)"]}
                />
                <Cities
                  cities={this.state.cities}
                  componentRestrictions={{ country: "us" }}
                  chosenCity={this.setCurrentLocationIndex}
                  delete={this.handleDeleteCity}
                />
              </div>
            </Col>
            <Col xs="12" sm="6">
              <WeatherAPI city={currentLocation} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Weather;
