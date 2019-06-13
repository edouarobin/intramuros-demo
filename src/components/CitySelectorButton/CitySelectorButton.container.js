// @flow
import { connect } from 'react-redux';

import { selectors } from 'Intramuros/src/redux/cities';
import citiesActionCreators from 'Intramuros/src/redux/cities/actionCreators';
import { withNavigation } from 'react-navigation';
import CitySelectorButton from './CitySelectorButton.component';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';

const mapStateToProps = (rootState: RootStateType): * => ({
  selectedCity: selectors.selectedCity(rootState),
  isAroundMeSelected: selectors.isAroundMeSelected(rootState),
  citiesList: citySelectors.cities(rootState),
  selectedCity: citySelectors.selectedCity(rootState),
  selectedCitiesNotification: citySelectors.selectedCitiesNotification(
    rootState
  ),
  citiesLoading: citySelectors.getCitiesLoading(rootState),
  // modalVisible: citySelectors.modalVisible(rootState),
});

const mapDispatchToProps = {
  fetchCities: () => citiesActionCreators.requestGetCitiesStart(),
  selectCity: (
    id: number,
    aggloId: number,
    cityName: string,
    notification?: boolean
  ) => citiesActionCreators.selectCity(id, aggloId, cityName, notification),
  toggleCityNotification: (id: number, cityName: string) =>
    citiesActionCreators.toggleCityNotification(id, cityName),
  // selectAroundMe: (coords: { latitude: number, longitude: number }) =>
  //   citiesActionCreators.selectAroundMe(coords),
  // closeModal: () => citiesActionCreators.closeModal(),
  // openModal: () => citiesActionCreators.openModal(),
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CitySelectorButton)
);
