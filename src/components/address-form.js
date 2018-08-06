import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  Form as form,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap';

const errorsText = {
  streetRequired: 'Street is required',
  districtAndWardRequired: 'Both Ward and District are required',
  cityRequired: 'City is required'
};

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
      },
      errors: {
        street: '',
        city: '',
        district: ''
      },
      isFormValid: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { updatedAddress } = nextProps;
    if (updatedAddress && updatedAddress.selectedAddress) {
      const { address } = updatedAddress;
      Object.entries(address).forEach(item => {
        this.setState({ address: { [item[0]]: item[1] } });
      });
    }
  }
  getValidationState = () => {
    const { street, ward, district, city } = this.state.address;
    const errors = {};
    let isFormValid = true;

    if (!street.length) {
      isFormValid = false;
      errors.street = errorsText.streetRequired;
    } else {
      errors.street = '';
    }

    if (city.length) {
      errors.city = '';
      errors.district = '';
    } else if (district.length && ward.length) {
      errors.district = '';
      errors.city = '';
    } else if (!city.length && (district.length || ward.length)) {
      isFormValid = false;
      errors.district = errorsText.districtAndWardRequired;
      errors.city = '';
    } else {
      isFormValid = false;
      errors.district = '';
      errors.city = errorsText.cityRequired;
    }

    this.setState({ errors });

    return isFormValid;
  };

  resetState = () => {
    this.setState({
      address: {
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
      },
      errors: {
        street: '',
        city: '',
        district: ''
      },
      isFormValid: false
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState(({ address }) => ({
      address: { ...address, [name]: value }
    }));
  };

  submitHandler = e => {
    e.preventDefault();
    const { updatedAddress } = this.props;
    const isFormValid = this.getValidationState();
    if (!isFormValid) return;
    this.props.submitHandler(
      this.state.address,
      updatedAddress ? updatedAddress.selectedAddress : null
    );
    this.setState({
      isFormValid: true
    });
    this.resetState();
  };

  buildComponent = (props, state) => {
    const { street, ward, district, city, country } = state.address;
    const { errors } = state;
    return (
      <Panel>
        <Panel.Body>
          <form onSubmit={this.submitHandler}>
            <FormGroup>
              <ControlLabel>
                <span className="required">Street</span>
              </ControlLabel>
              <FormControl
                name="street"
                type="text"
                value={street}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
              {errors.street ? (
                <div className="text-danger">{errors.street}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Ward</ControlLabel>
              <FormControl
                name="ward"
                type="text"
                value={ward}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup>
              <ControlLabel>District</ControlLabel>
              <FormControl
                name="district"
                type="text"
                value={district}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
              {errors.district ? (
                <div className="text-danger">{errors.district}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <ControlLabel>City/Provice</ControlLabel>
              <FormControl
                name="city"
                type="text"
                value={city}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
              {errors.city ? (
                <div className="text-danger">{errors.city}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Country</ControlLabel>
              <FormControl
                name="country"
                type="text"
                value={country}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button bsSize="large" bsStyle="primary" type="submit">
              Submit
            </Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  };

  render() {
    return this.buildComponent(this.props, this.state);
  }
}

AddressForm.defaultProps = {
  updatedAddress: {}
};

AddressForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  updatedAddress: PropTypes.object
};
