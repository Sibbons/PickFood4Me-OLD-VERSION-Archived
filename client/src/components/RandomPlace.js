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
                this.setState({ response });
            });
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
                    <p>Name: {this.state.response.name}</p>
                    <p>Price: {this.state.response.price}</p>
                    <p>Location: {this.state.response.location}</p>
                    <p>Phone: {this.state.response.phone}</p>

                </div>
            )
        } else {
            return <h1>Loading Please Wait</h1>
        }
    }




    render() {

        return (
            <div>
                {this.renderFields}
            </div>
        );
    }
}

export default RandomPlace;