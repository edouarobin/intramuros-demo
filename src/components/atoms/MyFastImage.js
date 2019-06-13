import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import { startsWith } from 'lodash';

export default class MyFastImage extends Component {
  render() {
    const { source, style, resizeMode, localImage } = this.props;
    if (!source) {
      return null;
    }

    //Bug avec fastimage si l'url ne commence pas par http ou https (IllegalArgumentException: Must not be null or empty). Attente d'un fix
    if (
      localImage ||
      startsWith(source.uri, 'http://') ||
      startsWith(source.uri, 'https://')
    ) {
      return (
        <FastImage style={style} source={source} resizeMode={resizeMode} />
      );
    }

    return null;
  }
}
