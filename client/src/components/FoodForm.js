import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


class FoodForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: true,
            foodType: '',
            address: '',
            options: {
                types: ['(cities)'],
                componentRestrictions: { country: 'us' }
            }
        };
    }
    handleFoodChange = event => {
        this.setState({ foodType: event.target.value });
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address });
    };

    handleSubmit = event => {
        const foodType = this.state.foodType;
        const address = this.state.address;
        const data = {
            foodType,
            address
        }
        event.preventDefault();
        console.log(data);
        fetch('http://localhost:5000/api/inputFields', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        window.location = "/place";
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Type of food</label>
                    <br />

                    <input type="text" value={this.state.foodType} onChange={this.handleFoodChange} placeholder="Default Anything" />
                    <br />
                    <label>Current Location</label>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        searchOptions={this.state.options}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Enter your City',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#00FFFF" : "#fff",
                                            cursor: 'pointer'
                                        };

                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <button onClick={this.redirect}>Submit</button>
                </form>

            </div>
        );
    }
}

export default FoodForm;