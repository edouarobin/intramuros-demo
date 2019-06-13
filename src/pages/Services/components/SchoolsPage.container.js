// @flow
import { connect } from 'react-redux';

import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as schoolSelector } from 'Intramuros/src/redux/schools';
import schoolsActionCreators from 'Intramuros/src/redux/schools/actionCreators';

import SchoolsPage from './SchoolsPage.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
  schools: schoolSelector.schools(rootState),
  favoriteSchools: schoolSelector.favoriteSchools(rootState),
});

const mapDispatchToProps = {
  saveFavoriteSchoolId: (id: number) =>
    schoolsActionCreators.saveFavoriteSchoolId(id),
  removeFavoriteSchoolId: (id: number) =>
    schoolsActionCreators.removeFavoriteSchoolId(id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolsPage);
