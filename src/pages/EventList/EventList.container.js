// @flow
import { connect } from 'react-redux';

import { selectors as eventSelectors } from 'Intramuros/src/redux/events';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as categorySelectors } from 'Intramuros/src/redux/categories';
import eventsActionCreators from 'Intramuros/src/redux/events/actionCreators';
import citiesActionCreators from 'Intramuros/src/redux/cities/actionCreators';
import categoriesActionCreators from 'Intramuros/src/redux/categories/actionCreators';

import EventList from './EventList.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  selectCityFromID: cityID => citySelectors.cityFromID(rootState, cityID),
  selectAggloFromID: aggloID => citySelectors.aggloFromID(rootState, aggloID),
  allEventsFiltered: eventSelectors.allEventsFiltered(rootState),
  selectedCity: citySelectors.selectedCity(rootState),
  citiesLoading: citySelectors.citiesLoading(rootState),
  eventsLoading: eventSelectors.getEventsLoading(rootState),
  categoriesLoading: categorySelectors.getCategoriesLoading(rootState),
});

const mapDispatchToProps = {
  fetchEvents: () => eventsActionCreators.requestGetEventsStart(),
  fetchCities: () => citiesActionCreators.requestGetCitiesStart(),
  fetchCategories: () => categoriesActionCreators.requestGetCategoriesStart(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
