import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import * as actions from '../actions';
import { GOOGLE_MAP_API } from '../sagas/google-map';

import {
  getAddresses,
  getCurrentLocation,
  getSearchLocation
} from '../reducers';

import AddressForm from '../components/address-form';
import AddressList from '../components/address-list';
import GoogleMapForm from '../components/google-map-form';

class MainContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    searchLocation: PropTypes.object,
    addresses: PropTypes.array,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      selectedAddress: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.syncAddressSaga());
    this.props.dispatch(actions.getCurrentLocationSaga());
  }

  submitHandler = (address) => {
    this.props.dispatch(actions.addAddressSaga(address, address.id));
    this.setState({ selectedAddress: {} });
  };

  deleteHandler = addressId => {
    this.props.dispatch(actions.deleteAddressSaga(addressId));
  };

  updateHandler = address => {
    this.setState({
      selectedAddress: address
    });

    const query = Object.values(address).join(' ');
    this.props.dispatch(actions.searchLocationSaga(query));
  };

  exportCSVHandler = () => {
    this.props.dispatch(actions.csvExportSaga(this.props.addresses));
  };

  buildComponent = (props, state) => {
    const { addresses, location, searchLocation } = props;
    const { selectedAddress } = state;
    const gmapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&v=3.exp&libraries=geometry,drawing,places`; // eslint-disable-line
    // if (addresses) {
    //   // const updatedAddress = { ...selectedAddress };
    //   return (
    //     <Grid>
    //
    //
    //     </Grid>
    //   );
    // }

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <AddressForm
              submitHandler={this.submitHandler}
              updatedAddress={selectedAddress}
            />
          </Col>
          <Col xs={6} md={4}>
            {!location.coords ? (
              <div>Loanding map</div>
            ) : (
              <GoogleMapForm
                searchLocation={searchLocation}
                currentLocation={location}
                googleMapURL={gmapURL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            )}
          </Col>
        </Row>
        {addresses ? <AddressList
          addresses={addresses}
          deleteHandler={this.deleteHandler}
          updateHandler={this.updateHandler}
          exportCSVHandler={this.exportCSVHandler}
        /> : null }
      </Grid>
    )
  };

  render() {
    return this.buildComponent(this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    addresses: getAddresses(state),
    location: getCurrentLocation(state),
    searchLocation: getSearchLocation(state)
  };
}

MainContainer.defaultProps = {
  location: {},
  searchLocation: {},
  addresses: []
};
export default connect(mapStateToProps)(MainContainer);
