// @flow

import { Linking, Platform } from 'react-native';

export const OpenMap = (lat: number, long: number, label: string = '') => {
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${lat},${long}`
      : `geo:${lat},${long}?q=${lat},${long}(${label})`;
  return Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        return "Can't open url";
      }
      return Linking.openURL(url);
    })
    .catch(() => 'An error occurred');
};

export const OpenSearchMap = (address: string = '') => {
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?q=${address}`
      : `geo:0,0?q=${address}`;
  return Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        return "Can't open url";
      }
      return Linking.openURL(url);
    })
    .catch(() => 'An error occurred');
};
