// @flow

import { StyleSheet } from 'react-native';

import globalStyle, { toasterHeight } from 'Intramuros/src/style/globalStyle';

export default StyleSheet.create({
  animatedView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: toasterHeight,
  },
  container: {
    height: toasterHeight,
    backgroundColor: globalStyle.colors.darkerGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});
