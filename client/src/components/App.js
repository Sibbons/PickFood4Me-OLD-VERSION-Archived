import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import FoodForm from './FoodForm';
import Randomplace from './RandomPlace';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={FoodForm} />
          <Route exact path="/place" component={Randomplace} />
        </BrowserRouter>
      </div>
    );
  };
};

export default App;
