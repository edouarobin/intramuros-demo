// @flow
import { connect } from 'react-redux';

import {
  actionCreators as reportsActionCreators,
  selectors as reportSelectors,
} from 'Intramuros/src/redux/reports';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';

import ReportPage from './ReportPage.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPage);
