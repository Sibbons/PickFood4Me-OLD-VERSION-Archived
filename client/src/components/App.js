import React, { useState, useMemo } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {AddressContext} from './AddressContext';


import LandingForm from './LandingForm';
import RandomPlace from "./RandomPlace";

function App(){
    const [address, setAddress] = useState("");
    const value = useMemo(() => ({address, setAddress}), [address, setAddress]);
  
    return (
      <div className="App">
        <AddressContext.Provider value={value}>
          <BrowserRouter>
            <Route exact path="/" component={LandingForm} />
            <Route exact path="/place" component={RandomPlace} />
          </BrowserRouter>
        </AddressContext.Provider>

      </div>
    );
}

export default App;
