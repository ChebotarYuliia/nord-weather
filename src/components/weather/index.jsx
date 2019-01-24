import React, { Component } from 'react';
import Cities from './cities&search';
import WeatherAPI from './api';
import Autocomplete from 'react-google-autocomplete';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import './style.css'

class Weather extends Component {
    constructor() {
        super();

        this.state = {
            cities: [
                { name: "Kharkiv" },
            ],
            activeCity: { name: "Kharkiv" },
        };
        this.setActiveCityIndex = this.setActiveCityIndex.bind(this);
        this.handleDeleteCity = this.handleDeleteCity.bind(this);
    }

    setActiveCityIndex = (newIndex) => {
        const index = newIndex;
        this.setState({ activeCity: this.state.cities[index] });
    }

    handleSearchSubmit(place) {
        const cities = [...this.state.cities];
        cities.push({ name: place.name });
        this.setState({
            cities,
        })
    };

    handleDeleteCity = (city) => {
        let filteredCities = this.state.cities.filter(function (item) {
            return (item.name !== city)
        });
        this.setState({
            cities: filteredCities,
        })
    };


    render() {

        const { activeCity } = this.state;

        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="12" sm="6">
                            <div className="cities-container">
                                <h1 className="cities-container__title">Choose a city</h1>
                                <Autocomplete
                                    id="searchInput"
                                    onPlaceSelected={(place) => { this.handleSearchSubmit(place) }}
                                    types={['(regions)']}
                                />
                                <Cities
                                    cities={this.state.cities}
                                    componentRestrictions={{ country: "us" }}
                                    chosenCity={this.setActiveCityIndex}
                                    delete={this.handleDeleteCity}
                                />
                            </div>
                        </Col>
                        <Col xs="12" sm="6">
                            <WeatherAPI city={activeCity.name} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Weather;
