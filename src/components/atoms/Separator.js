// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

const styles = StyleSheet.create({
  separatorStyle: { height: 1, backgroundColor: globalStyle.colors.grey },
});

export default () => <View style={styles.separatorStyle} />;
