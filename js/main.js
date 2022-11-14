import {setAddress, getAdFormDisabled, getAdFormActive, onResetAdForm, resetForm, showSuccessMessage, showErrorMessage, setOnFormSubmit} from './ad-form.js';
import {initMap, setAdPins, setOnMapLoad, setOnMainPinMove, resetMap} from './map.js';
import {createSlider, setOnSliderUpdate} from './slider.js';
import {getData, sendData} from './api.js';
import {showAlert, turnFilterOff, turnFilterOn, debounce} from './util.js';
import {START_COORDINATE} from './constants.js';
import {setOnFilterChange, getFilteredOffers} from './filters.js';

const onSendDataSuccess = () => {
  resetForm();
  resetMap();
  showSuccessMessage();
};

const onGetDataSuccess = (advertisements) => {
  setOnFilterChange(debounce(() => {
    setAdPins(getFilteredOffers(advertisements));
  }));
  setAdPins(getFilteredOffers(advertisements));
  turnFilterOn();
};

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  resetMap();
  getAdFormActive();
});

onResetAdForm(resetMap);

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

getAdFormDisabled();
turnFilterOff();
initMap(START_COORDINATE);
createSlider();
setOnSliderUpdate();
getData(onGetDataSuccess, showAlert);
