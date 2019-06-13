// @flow
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { selectors as eventSelectors } from 'Intramuros/src/redux/events';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as categorySelectors } from 'Intramuros/src/redux/categories';
import categoriesActionCreators from 'Intramuros/src/redux/categories/actionCreators';

import HeaderEventList from './HeaderEventList.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  allEventsFiltered: eventSelectors.allEventsFiltered(rootState),
  currentFilters: categorySelectors.currentFilters(rootState),
  selectedFilters: categorySelectors.selectedFilters(rootState),
  selectCityFromID: cityID => citySelectors.cityFromID(rootState, cityID),
  filtersList: categorySelectors.filters(rootState),
});

const mapDispatchToProps = {
  selectFilter: (id: number, isDelete: boolean) =>
    categoriesActionCreators.selectFilter(id, isDelete),
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderEventList)
);
