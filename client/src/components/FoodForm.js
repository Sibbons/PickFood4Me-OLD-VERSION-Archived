import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GoogleComponent } from 'react-google-location'


class FoodForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };
    }
    handleFoodChange = event => {
        this.setState({ foodType: event.target.value });
    }
    handleAddressChange = event => {
        this.setState({ address: event })
    }


    handleSubmit = event => {
        const address = this.state.address.place;
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


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Current Location</label>
                    <GoogleComponent

                        apiKey={"AIzaSyBvloS4OahFAEgjuX67ntBAB6FgdVhQgZU&libraries=places"}
                        language={'en'}
                        country={'country:in|country:us'}
                        coordinates={true}
                        locationBoxStyle={'custom-style'}
                        locationListStyle={'custom-style-list'}
                        onChange={this.handleAddressChange} />

                    <button onClick={this.redirect}>Submit</button>
                </form>

            </div>
        );
    }
}

export default FoodForm;