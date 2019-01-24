
import React, { Component } from 'react';

class Cities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCityIndex: 0,
        };

        this.createCitiesArray = this.createCitiesArray.bind(this);
        this.setChosenCityIndex = this.setChosenCityIndex.bind(this);
        this.delete = this.delete.bind(this);
    };

    createCitiesArray = (city, index) => {
        return (
            <div className="city-wrp" key={index}>
                <button
                    className={(this.state.activeCityIndex === index) ? 'city-btn active' : 'city-btn'}
                    onClick={() => this.setChosenCityIndex(index)}
                >
                    {city.name}
                </button>
                <button className="delete-city__btn"
                    onClick={() => this.delete(city.name)}>
                    Delete
                </button>
            </div>
        )
    };

    setChosenCityIndex = (index) => {
        this.setState({
            activeCityIndex: index,
        });
        this.props.chosenCity(index);
    }

    delete = (cityName) => {
        this.props.delete(cityName)
    };

    render() {
        let citiesArray = this.props.cities.map(this.createCitiesArray);
        return (
            <div>{citiesArray}</div>
        );
    }
}

export default Cities;