// @flow
import { connect } from 'react-redux';

import { selectors } from 'Intramuros/src/redux/events';

import EventDetail from './EventDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  eventDetails: selectors.selectEventDetailsFromID(
    rootState,
    ownProps.navigation.state.params.eventID
  ),
  eventID: ownProps.navigation.state.params.eventID,
  isNotification: ownProps.navigation.state.params.isNotification,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
