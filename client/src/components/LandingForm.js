import React, {useState, useContext} from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import {useHistory} from 'react-router-dom'
import {AddressContext} from './AddressContext';

function LandingForm() {
  const {address, setAddress} = useContext(AddressContext);
  const [addressError, setAddressError] =  useState("")
  const options = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" },
  }
  const history = useHistory();

  function isValid(){
    let error_msg = "Must enter an address";
    if (!address.length) {
        setAddressError(error_msg);
        return false;
    }

    return true;
  }

  function getCoords(pos) {
    console.log(pos);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=AIzaSyBvloS4OahFAEgjuX67ntBAB6FgdVhQgZU`
    )
      .then((response) => response.json())
      .then((data) =>
        setAddress(data.results[0].formatted_address)
      )
      .catch((error) => alert(error));
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getCoords);
    } else {
      alert("GeoLocation not enabled");
    }
  }

  const handleSubmit = (event) => { 
    event.preventDefault();
    let valid = isValid();
    if (valid) {
      history.push("/place");
    }
  };

  return (
    <div className="landingWrapper">
      <div className="header">
        <h1>Can't decide where to eat?</h1>
      </div>
      <form onSubmit={handleSubmit} className="formContainer">
        <PlacesAutocomplete
          value={address}
          onChange={(address) => setAddress(address)}
          onSelect={(address) => setAddress(address)}
          searchOptions={options}
          requiredTxt
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Enter Location Here",
                  className: "searchBox",
                })}
              />
              <div className="autocomplete">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#b6d0e3" : "#fff",
                    cursor: "pointer",
                    padding: "0px 0px 0px 10px",
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div className="errorMsg">{addressError}</div>
        <input
          type="button"
          className="butn blue"
          onClick={getLocation}
          value="Use Current Location"
        />
        <input type="submit" className="butn lightBlue" value="Submit" />
      </form>
      <div className="footer">
        <p>Only Displays Open Locations</p>
      </div>
    </div>
  );
}

export default LandingForm;