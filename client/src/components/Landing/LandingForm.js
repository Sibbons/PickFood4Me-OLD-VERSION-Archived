import React, { Component } from 'react';
import PlacesAutocomplete from "react-places-autocomplete";

class LandingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            options: {
                types: ['(cities)'],
                componentRestrictions: { country: 'us' }
            }
        };
    }


    handleSubmit = event => {
        const address = this.state.address;
        const data = {
            address
        }
        event.preventDefault();
        console.log(data);
        fetch('/api/inputFields', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        window.location = "/place";
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="formContainer">
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
                                        placeholder: 'Enter Location here',
                                        className: 'searchBox',
                                    })}
                                />
                                <div className="autocomplete">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                            cursor: 'pointer',
                                            padding: "0px 0px 0px 20px"

                                        }
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    style
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <button className="butn">Find me Food like now</button>
                </form>

            </div>
        );
    }
}

export default LandingForm;