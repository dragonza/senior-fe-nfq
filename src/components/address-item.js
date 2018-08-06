import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddressItem = ({ address, id, updateHandler, deleteHandler }) => {
  return (
    <tr key={id}>
      <td>{address.street}</td>
      <td>{address.ward}</td>
      <td>{address.district}</td>
      <td>{address.city}</td>
      <td>{address.country}</td>
      <td>
        <ButtonToolbar>
          <Button
            value={id}
            bsSize="xsmall"
            bsStyle="primary"
            onClick={updateHandler}
          >
            Edit
          </Button>
          <Button
            value={id}
            bsSize="xsmall"
            bsStyle="danger"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </ButtonToolbar>
      </td>
    </tr>
  );
};

export default AddressItem;
AddressItem.propTypes = {
  address: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  exportCSVHandler: PropTypes.func // eslint-disable-line
};
