import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Panel, Button, ButtonToolbar } from "react-bootstrap";

export default class AddressList extends Component {
  deleteHandler = e => {
    this.props.deleteHandler(e.target.value);
  };

  updateHandler = e => {
    e.preventDefault();
    console.log("e", e.target);
    this.props.updateHandler(e.target.value);
  };

  downloadCSVHandler = () => {
    this.props.exportCSVHandler(this.props.addresses);
  };

  buildComponent = props => {
    const { addresses } = props;
    console.log('addresses', addresses);
    const allAddress = Object.entries(addresses);
    console.log('allAddress', allAddress)
    if (!allAddress.length) {
      return <div>Loading</div>
    }
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
                return (
                  <tr key={item[0]}>
                    <td>{address.street}</td>
                    <td>{address.ward}</td>
                    <td>{address.district}</td>
                    <td>{address.city}</td>
                    <td>{address.country}</td>
                    <td>
                      <ButtonToolbar>
                        <Button
                          value={item[0]}
                          bsSize="xsmall"
                          bsStyle="primary"
                          onClick={this.updateHandler}
                        >
                          Edit
                        </Button>
                        <Button
                          value={item[0]}
                          bsSize="xsmall"
                          bsStyle="danger"
                          onClick={this.deleteHandler}
                        >
                          Delete
                        </Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
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
