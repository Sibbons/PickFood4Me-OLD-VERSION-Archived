import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import {AddressContext} from './AddressContext';
  const {address, setAddress} = useContext(AddressContext);


function RandomPlace(){
  const [response, setResponse] = useState({});
  const {address, setAddress} = useContext(AddressContext)
  const history = useHistory()

  //console.log('address',address);

  useEffect(() => {
    getplace();
  }, [address]);
  
  //http://localhost:5000
  //https://pickfoodforme.herokuapp.com/
  function getplace(){
    setResponse({});
    try{
    
    fetch(`https://pickfoodforme.herokuapp.com/api/getplace/${address}`)
    .then((response) => response.json())
    .then((response) => {
      setResponse(response);
    });}catch(error){
      console.log(error);
    }
  };

  function newLocation(){
    setAddress("");
    history.push('/');
  };

  function renderFields() {
    if ("error" in response || !address.length ) {
      return (
        <div className="errorWrapper">
          <h1>{response.error || "Must enter an address"}</h1>
          <button type="button" className="errorBtn errorBtn" onClick={newLocation}>
            {" "}
            Enter New Location
          </button>
        </div>
      );
    } else if ("phone" in response) {

      return (
        <div className="foodPlace">
          <p>
            Name:{" "}
            <a className="yelp" target="_blank" href={response.url}>
              {response.name}
            </a>
          </p>
          <p>
            Location:{" "}
            <a target="_blank" className="googleMaps"
               href={`https://maps.google.com/?q=${response.location}`}
            >
              {response.location}
            </a>
          </p>
          <p>Phone: {response.phone}</p>
          <div className="buttonContainer">
            <button type="button" className="blue myButton" onClick={getplace}>
              Find New Spot
            </button>
            <button type="button" className="lightBlue myButton" onClick={newLocation}>
              Enter New Location
            </button>
          </div>
        </div>
      );
    } else {
      return <div className="loading">Loading</div>;
    }
  }
  return (
    <div className="foodPlaceWrapper">
      <div>{renderFields()}</div>
    </div>
  );
}


export default RandomPlace;