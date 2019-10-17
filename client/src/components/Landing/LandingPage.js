import React, { Component } from 'react';
import LandingForm from './LandingForm';


class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div className="landingWrapper">
                <LandingForm />
            </div>
        );
    }
}

export default LandingPage;