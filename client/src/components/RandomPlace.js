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
    renderFields() {
        if ('error' in this.state.response) {
            return <h1>
                No location found with current preferences
            </h1>
        }
        else if ('phone' in this.state.response) {
            return (
                <div>
                    <p>Name : {this.state.response.name}</p>
                    <p>Location: {this.state.response.location}</p>
                    <p>Phone: {this.state.response.phone}</p>
                    <div className="foodButtons">
                        <a target='_blank'
                            href={`https://maps.google.com/?q=${this.state.response.location}`}
                            className="blue myButton">Google Maps</a>
                        <a target='_blank' href={this.state.response.url} className="red myButton">Open Yelp</a>
                        <button type="button" className="green myButton" onClick={this.refreshPage}>New Spot!</button>
                    </div>



                </div>
            )
        } else {
            return <h1>Loading Please Wait</h1>
        }
    }

    render() {
        return (
            <div className="foodPlaceWrapper">
                <div className="foodPlace">
                    {this.renderFields()}
                </div>
            </div>
        )

    }
}

export default RandomPlace;