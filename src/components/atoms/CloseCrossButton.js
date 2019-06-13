// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyle, {
  IOS_STATUS_BAR_HEIGHT,
} from 'Intramuros/src/style/globalStyle';

type PropsType = {
  closeImageModal: () => void,
  color: string,
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: IOS_STATUS_BAR_HEIGHT,
    paddingRight: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
});

export default class CloseCrossButton extends PureComponent<PropsType> {
  render() {
    const color = this.props.color;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={this.props.closeImageModal}>
          <View
            style={{
              width: 50,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="md-close" size={40} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
