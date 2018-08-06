import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const GoogleMapHoC = withScriptjs(
  withGoogleMap(props => {
    const { currentLocation, searchLocation } = props;
    if (!currentLocation) {
      return null;
    }
    console.log('currentLocation', currentLocation);
    const { coords } = currentLocation;
    const { location } = searchLocation || {};
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={location || { lat: coords.latitude, lng: coords.longitude }}
      >
        <Marker
          position={location || { lat: coords.latitude, lng: coords.longitude }}
        />
      </GoogleMap>
    );
  })
);

export default class GoogleMapForm extends Component {
  buildComponent = props => {
    const { currentLocation, searchLocation } = props;
    return <GoogleMapHoC {...props} {...currentLocation} {...searchLocation} />;
  };

  render() {
    return this.buildComponent(this.props, this.state);
  }
}

GoogleMapForm.propTypes = {
  currentLocation: PropTypes.object,
  searchLocation: PropTypes.object
};

GoogleMapForm.defaultProps = {
  currentLocation: {},
  searchLocation: {}
};
