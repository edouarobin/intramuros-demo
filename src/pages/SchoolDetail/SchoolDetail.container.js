// @flow
import { connect } from 'react-redux';

import { selectors as schoolSelector } from 'Intramuros/src/redux/schools';
import schoolsActionCreators from 'Intramuros/src/redux/schools/actionCreators';
import SchoolDetail from './SchoolDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  school: ownProps.navigation.state.params.school,
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
)(SchoolDetail);
