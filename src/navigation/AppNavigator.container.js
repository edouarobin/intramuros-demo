// @flow

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator.component';

const mapStateToProps = rootState => ({
  state: rootState,
});

export default connect(mapStateToProps)(AppNavigator);
