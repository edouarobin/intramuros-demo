// @flow
import { connect } from 'react-redux';

import { selectors as pointsOfInterestSelectors } from 'Intramuros/src/redux/pointsOfInterest';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import pointsOfInterestActionCreators from 'Intramuros/src/redux/pointsOfInterest/actionCreators';

import Discover from './Discover.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
  selectCityFromID: cityID => citySelectors.cityFromID(rootState, cityID),
  pointsOfInterest: pointsOfInterestSelectors.pointsOfInterest(rootState),
  pointsOfInterestLoading: pointsOfInterestSelectors.getPointsOfInterestLoading(
    rootState
  ),
});

const mapDispatchToProps = {
  fetchPointsOfInterest: () =>
    pointsOfInterestActionCreators.requestGetPointsOfInterestStart(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
