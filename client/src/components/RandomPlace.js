import React, { Component } from 'react';
import axios from 'axios';
class RandomPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
        };
    }

    async componentDidMount() {
        const res = await axios.get('/api/getPlace');
        console.log('res', res.data);
        this.setState({ response: (res.data) })
    }

    render() {
        return (
            <div>
                <p>Name: {this.state.response.name}</p>
                <p>Price: {this.state.response.price}</p>
                <p>Location: {this.state.response.location}</p>
                <p>Phone: {this.state.response.phone}</p>

            </div>
        );
    }
}

export default RandomPlace;