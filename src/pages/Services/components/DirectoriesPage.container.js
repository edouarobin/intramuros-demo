// @flow
import { connect } from 'react-redux';

import { selectors as directorySelector } from 'Intramuros/src/redux/directories';

import DirectoriesPage from './DirectoriesPage.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any): * => ({
  directories: directorySelector.directories(rootState),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectoriesPage);
