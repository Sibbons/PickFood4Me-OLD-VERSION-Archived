import React, { Component } from 'react';
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
                <h1>Can't Decide Where to eat?</h1>
                <h2>Enter a location below for a random spot!!</h2>
                <form onSubmit={this.handleSubmit} className="formContainer">
                    <GoogleComponent
                        apiKey={"AIzaSyBvloS4OahFAEgjuX67ntBAB6FgdVhQgZU&libraries=places"}
                        language={'en'}
                        country={'country:in|country:us'}
                        coordinates={true}
                        locationBoxStyle={'searchBox'}
                        locationListStyle={'listStyle'}
                        onChange={this.handleAddressChange}
                        placeholder="" />

                    <button className="butn">Find me Food</button>
                </form>

            </div>
        );
    }
}

export default FoodForm;