import { take, call, put, all, takeEvery } from 'redux-saga/effects';
import { searchAddressSaga } from './google-map';
import { exportCSVFileSaga } from './csv-export';

import rsf from './firebase';
import * as actions from '../actions';
// import { csvExportSaga } from '../actions';

function* syncAddressList() {
  const channel = yield call(rsf.database.channel, 'addresses');
  while (true) {
    const { value } = yield take(channel);
    yield put(actions.syncAddress(value));
  }
}

function* submitAddress({ address, selectedAddress }) {
  if (selectedAddress) {
    // update
    yield call(rsf.database.update, `addresses/${selectedAddress}`, {
      address
    });
  } else {
    yield call(rsf.database.create, 'addresses', { address });
  }
}

function* deleteAddress({ addressId }) {
  yield call(rsf.database.delete, `addresses/${addressId}`);
}

function userPositionPromised() {
  const position = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      location => position.on({ location }),
      error => position.on({ error }),
      { enableHighAccuracy: true }
    );
  }
  return {
    getLocation: () => new Promise(location => (position.on = location)) // eslint-disable-line
  };
}

function* getUserLocation() {
  const { getLocation } = yield call(userPositionPromised);
  const { error, location } = yield call(getLocation);
  if (error) {
    console.error('Failed to get user position!', error);
  } else {
    yield put(actions.updateCurrentLocation(location));
  }
}

function* exportToCSV({ data }) {
  //   console.log('data: ', data);
  if (data) {
    yield call(exportCSVFileSaga, data);
  } else {
    console.error('data not found');
  }
}

function* watchAddress() {
  yield takeEvery(actions.SYNC_ADDRESS_SAGA, syncAddressList);
  yield takeEvery(actions.ADD_ADDRESS_SAGA, submitAddress);
  yield takeEvery(actions.DELETE_ADDRESS_SAGA, deleteAddress);
  yield takeEvery(actions.CSV_EXPORT_SAGA, exportToCSV);
}

function* watchLocation() {
  yield takeEvery(actions.CURRENT_LOCATION_SAGA, getUserLocation);
  yield takeEvery(actions.SEARCH_LOCATION_SAGA, searchAddressSaga);
}

export default function* rootSaga() {
  yield all([watchAddress(), watchLocation()]);
}
