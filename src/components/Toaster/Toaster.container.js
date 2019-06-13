// @flow

import { connect } from 'react-redux';

import { selectors, actionCreators } from 'Intramuros/src/redux/toaster';

import Toaster from './Toaster.component';

const mapStateToProps = (rootState: RootStateType): * =>
  selectors.show(rootState);

const mapDispatchToProps = {
  closeToaster: () => actionCreators.hide(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toaster);
