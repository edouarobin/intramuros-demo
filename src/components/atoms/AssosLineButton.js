// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  label: string,
  picto: any,
  onPress: any => void,
  onNotificationPress?: any => void,
  isNotificationSelected?: boolean,
  notificationDisable?: boolean,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    flex: 1,
    backgroundColor: globalStyle.colors.white,
  },
  lineContainer: {
    height: 44,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: globalStyle.colors.white,
    flex: 1,
  },
  text: {
    color: 'black',
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    lineHeight: globalStyle.sizes.medium,
  },
  pictoContainer: {
    width: 44 + 15,
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pictoSelected: {
    color: globalStyle.colors.yellow,
    marginRight: 18,
  },
  pictoNotSelected: {
    color: globalStyle.colors.grey,
    marginRight: 18,
  },
});

export default class AssosLineButton extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <MyFastImage
            style={{
              height: 44,
              width: 44,
            }}
            source={{
              uri: this.props.picto,
              priority: 'normal',
            }}
            resizeMode={'contain'}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={styles.lineContainer}
        >
          <Text style={styles.text} numberOfLines={2}>
            {this.props.label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.onNotificationPress()}
          style={styles.pictoContainer}
        >
          {this.props.isNotificationSelected ? (
            <Icon style={[styles.pictoSelected]} name={'bell'} size={20} />
          ) : (
            <Icon style={[styles.pictoNotSelected]} name={'bell-o'} size={20} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
