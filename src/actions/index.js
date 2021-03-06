export const SYNC_ADDRESS_SAGA = 'sync_address_saga';
export const ADD_ADDRESS_SAGA = 'add_address_saga';
export const DELETE_ADDRESS_SAGA = 'delete_address_saga';
export const CURRENT_LOCATION_SAGA = 'current_location_saga';
export const SEARCH_LOCATION_SAGA = 'search_location_saga';
export const CSV_EXPORT_SAGA = 'csv_support_saga';

export const SYNC_ADDRESS = 'sync_address';
export const UPDATE_LOCATION = 'update_location';
export const UPDATE_SEARCH_LOCATION = 'update_search_location';

export const updateSearchLocation = searchLocation => {
  return {
    type: UPDATE_SEARCH_LOCATION,
    searchLocation
  };
};

export const syncAddress = addresses => {
  return {
    type: SYNC_ADDRESS,
    addresses
  };
};

export const updateCurrentLocation = location => {
  return {
    type: UPDATE_LOCATION,
    location
  };
};

export const addAddressSaga = (address, selectedAddress = null) => {
  return {
    type: ADD_ADDRESS_SAGA,
    address,
    selectedAddress
  };
};

export const syncAddressSaga = amount => {
  return {
    type: SYNC_ADDRESS_SAGA,
    amount
  };
};

export const deleteAddressSaga = addressId => {
  return {
    type: DELETE_ADDRESS_SAGA,
    addressId
  };
};

export const getCurrentLocationSaga = () => {
  return {
    type: CURRENT_LOCATION_SAGA
  };
};

export const searchLocationSaga = query => {
  return {
    type: SEARCH_LOCATION_SAGA,
    query
  };
};

export const csvExportSaga = data => {
  return {
    type: CSV_EXPORT_SAGA,
    data
  };
};
