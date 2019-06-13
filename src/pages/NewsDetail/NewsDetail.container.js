// @flow
import { connect } from 'react-redux';

import { selectors } from 'Intramuros/src/redux/news';

import NewsDetail from './NewsDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  newsDetails: selectors.selectNewsDetailsFromID(
    rootState,
    ownProps.navigation.state.params.newsID
  ),
  notificationTitle: ownProps.navigation.state.params.notificationTitle,
  notificationBody: ownProps.navigation.state.params.notificationBody,
  notificationImage: ownProps.navigation.state.params.notificationImage,
  notificationCityName: ownProps.navigation.state.params.notificationCityName,
  notificationCityId: ownProps.navigation.state.params.notificationCityId,
  notificationAssoId: ownProps.navigation.state.params.notificationAssoId,
  notificationAssoName: ownProps.navigation.state.params.notificationAssoName,
  notificationAssoPicto: ownProps.navigation.state.params.notificationAssoPicto,
  notificationAssoCity: ownProps.navigation.state.params.notificationAssoCity,
  isNotification: ownProps.navigation.state.params.isNotification,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDetail);
