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
        const res = axios.get('/api/getPlace');
        this.setState({ response: res.data })

    }

    render() {
        return (
            <div>
                {this.state.response}
            </div>
        );
    }
}

export default RandomPlace;