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
    console.log('address', address);
    this.props.updateHandler(e.target.value);
  };

  downloadCSVHandler = () => {
    this.props.exportCSVHandler(this.props.addresses);
  };

  buildComponent = props => {
    const { addresses } = props;
    const allAddress = Object.entries(addresses);
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h1">Addresses</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Table striped bordered condensed hover>
            {this.renderTableHeader()}
            <tbody>
              {allAddress.map(item => {
                const { address } = item[1];
                console.log('address', address);
                return (
                  <AddressItem
                    key={item[0]}
                    updateHandler={e => this.updateHandler(e, address)}
                    deleteHandler={this.deleteHandler}
                    address={address}
                    id={item[0]}
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
            Total: {allAddress.length} - Download CSV
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
  addresses: PropTypes.object,
  deleteHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  exportCSVHandler: PropTypes.func // eslint-disable-line
};

AddressList.defaultProps = {
  addresses: {}
};
