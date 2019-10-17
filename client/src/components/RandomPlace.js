import React, { Component } from 'react';
class RandomPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
        };
        this.renderFields = this.renderFields.bind(this);
    }

    componentDidMount() {
        fetch('/api/getPlace')
            .then(response => response.json())
            .then(response => {
                this.setState({ response })
            });
    }

    refreshPage = () => {
        window.location.reload();
    }
    newLocation = () => {
        window.location = '/';
    }
    renderFields() {
        if ('error' in this.state.response) {
            return (
                <div className="errorWrapper">
                    <h1>
                        {this.state.response.error}
                    </h1>
                    <button type="button" className="errorBtn errorBtn" onClick={this.newLocation}> Enter New Location</button>
                </div>
            )

        }
        else if ('phone' in this.state.response) {
            return (
                <div className="foodPlace">
                    <p>Name: <a className="yelp" target='_blank' href={this.state.response.url}>{this.state.response.name}</a></p>
                    <p>Location: <a target='_blank' className="googleMaps"
                        href={`https://maps.google.com/?q=${this.state.response.location}`}
                    >{this.state.response.location}</a>
                    </p>
                    <p>Phone: {this.state.response.phone}</p>
                    <div className="buttonContainer">
                        <button type="button" className="blue myButton" onClick={this.refreshPage}>Find New Spot</button>
                        <button type="button" className="green myButton" onClick={this.newLocation}>Enter New Location</button>
                    </div>



                </div>
            )
        } else {
            return (
                <div class="lds-spinner">
                    <div></div><div></div><div></div><div></div><div></div><div>
                    </div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="foodPlaceWrapper">
                <div>
                    {this.renderFields()}
                </div>
            </div>
        )

    }
}

export default RandomPlace;