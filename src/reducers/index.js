import { combineReducers } from 'redux';
import routerReducer from './router-reducer';
import appReducer from './app-reducer';

const reduxApp = combineReducers({
  appReducer,
  routing: routerReducer
});

// selections
export const getAddresses = state => {
  const { addresses } = state.appReducer;
  return Object.keys(addresses).map(addressId => ({
    ...addresses[addressId].address,
    id: addressId
  }));
};
export const getCurrentLocation = state => state.appReducer.location;
export const getSearchLocation = state => state.appReducer.searchLocation;

export default reduxApp;
