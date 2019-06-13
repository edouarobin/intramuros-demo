// @flow
import { connect } from 'react-redux';

import { selectors as eventSelectors } from 'Intramuros/src/redux/events';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { concat } from 'lodash';
import FilterDetail from './FilterDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  selectCityFromID: cityID => citySelectors.cityFromID(rootState, cityID),
  selectAggloFromID: aggloID => citySelectors.aggloFromID(rootState, aggloID),
  eventsList: eventSelectors.allEventsFiltered(rootState).all,
  filters: ownProps.navigation.state.params.filters,
  filterId: ownProps.navigation.state.params.filterId,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterDetail);
