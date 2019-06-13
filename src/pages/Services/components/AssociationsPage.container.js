// @flow
import { connect } from 'react-redux';

import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as assoSelector } from 'Intramuros/src/redux/associations';
import assosActionCreators from 'Intramuros/src/redux/associations/actionCreators';

import AssociationsPage from './AssociationsPage.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
  assos: assoSelector.assos(rootState),
  selectedAssosNotification: assoSelector.selectedAssosNotification(rootState),
});

const mapDispatchToProps = {
  toggleAssoNotification: (id: number, assoName: string) =>
    assosActionCreators.toggleAssosNotification(id, assoName),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociationsPage);
