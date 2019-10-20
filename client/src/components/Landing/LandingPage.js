import React, { Component } from 'react';
import LandingForm from './LandingForm';
import Header from './Header';
import Footer from './Footer';

class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div className="landingWrapper">
                <Header />
                <LandingForm />
                <Footer />
            </div>
        );
    }
}

export default LandingPage;