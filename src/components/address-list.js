import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Panel, Button } from 'react-bootstrap';
import AddressItem from './address-item';

export default class AddressList extends Component {
  deleteHandler = e => {
    this.props.deleteHandler(e.target.value);
  };

  updateHandler = (e, address) => {
    e.preventDefault();
    const { street, city, ward, district, country, id } = address;
    this.props.updateHandler({ street, city, ward, district, country, id });
  };

  downloadCSVHandler = () => {
    this.props.exportCSVHandler(this.props.addresses);
  };

  buildComponent = props => {
    const { addresses } = props;
    // const allAddress = Object.entries(addresses);
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h1">Addresses</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Table striped bordered condensed hover>
            {this.renderTableHeader()}
            <tbody>
              {addresses.map(address => {
                return (
                  <AddressItem
                    key={address.id}
                    updateHandler={e => this.updateHandler(e, address)}
                    deleteHandler={this.deleteHandler}
                    address={address}
                    id={address.id}
                  />
                );
              })}
            </tbody>
          </Table>
        </Panel.Body>
        <Panel.Footer>
          <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={this.downloadCSVHandler}
          >
            Total: {addresses.length} - Download CSV
          </Button>
        </Panel.Footer>
      </Panel>
    );
  };

  renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Street</th>
          <th>Ward</th>
          <th>District</th>
          <th>City/Province</th>
          <th>Country</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  render() {
    return this.buildComponent(this.props, this.state);
  }
}

AddressList.propTypes = {
  addresses: PropTypes.array,
  deleteHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  exportCSVHandler: PropTypes.func // eslint-disable-line
};

AddressList.defaultProps = {
  addresses: []
};
