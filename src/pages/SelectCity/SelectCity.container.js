// @flow
import { connect } from 'react-redux';

import { selectors } from 'Intramuros/src/redux/cities';
import citiesActionCreators from 'Intramuros/src/redux/cities/actionCreators';

import SelectCity from './SelectCity.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  citiesList: selectors.cities(rootState),
  selectedCity: selectors.selectedCity(rootState),
  citiesLoading: selectors.getCitiesLoading(rootState),
});

const mapDispatchToProps = {
  fetchCities: () => citiesActionCreators.requestGetCitiesStart(),
  selectCity: (id: number, aggloId: number, cityName: string) =>
    citiesActionCreators.selectCity(id, aggloId, cityName, true),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCity);
