// @flow
import { connect } from 'react-redux';

import { selectors as assoSelector } from 'Intramuros/src/redux/associations';
import assosActionCreators from 'Intramuros/src/redux/associations/actionCreators';
import AssoDetail from './AssoDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  asso: ownProps.navigation.state.params.asso
    ? ownProps.navigation.state.params.asso
    : assoSelector.selectAssosFromID(
        rootState,
        ownProps.navigation.state.params.assoId,
        ownProps.navigation.state.params.cityOfAsso
      ),
  cityIdOfAsso: ownProps.navigation.state.params.cityOfAsso,
  selectedAssosNotification: assoSelector.selectedAssosNotification(rootState),
  associationLoading: assoSelector.getAssosFromCityLoading(rootState),
});

const mapDispatchToProps = {
  toggleAssoNotification: (id: number, assoName: string) =>
    assosActionCreators.toggleAssosNotification(id, assoName),
  fetchAssosFromCity: (id: number) =>
    assosActionCreators.requestGetAssosFromCityStart({ id }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoDetail);
