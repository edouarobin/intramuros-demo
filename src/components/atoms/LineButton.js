// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  label: string,
  onPress: any => void,
  onNotificationPress?: any => void,
  isSelected: boolean,
  isCityNotificationSelected?: boolean,
  notificationDisable?: boolean,
  counter?: number,
  pictoName?: string,
  numberOfLines?: number,
  logo?: string,
};

let SIZE = 45;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: globalStyle.colors.white,
  },
  lineContainer: {
    height: SIZE,
    justifyContent: 'center',
    paddingLeft: 16,
    backgroundColor: globalStyle.colors.white,
    flex: 1,
  },
  lineContainerIfSelected: {
    height: SIZE,
    justifyContent: 'center',
    paddingLeft: 16,
    backgroundColor: globalStyle.colors.mainBlue,
    flex: 1,
  },
  text: {
    color: 'black',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    lineHeight: globalStyle.sizes.medium,
  },
  textIfSelected: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: globalStyle.sizes.medium,
  },
  pictoContainer: {
    width: SIZE + 15,
    height: SIZE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pictoContainerSelected: {
    width: SIZE + 15,
    height: SIZE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: globalStyle.colors.mainBlue,
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

export default class LineButton extends PureComponent<PropsType> {
  render() {
    let counterLabel = '';
    if (this.props.counter > -1) {
      counterLabel = ' (' + this.props.counter + ')';
    }

    const pictoName = this.props.pictoName ? this.props.pictoName : 'bell';
    const pictoNameO = pictoName + '-o';
    return (
      <View style={styles.container}>
        {this.props.logo ? (
          <View
            style={{
              paddingLeft: 16,
            }}
          >
            <MyFastImage
              style={{
                height: SIZE / 2,
                width: SIZE / 2,
              }}
              source={{
                uri: this.props.logo,
                priority: 'normal',
              }}
              resizeMode={'contain'}
            />
          </View>
        ) : null}

        <TouchableOpacity
          // disabled={this.props.isSelected}
          onPress={() => this.props.onPress()}
          style={
            this.props.isSelected
              ? styles.lineContainerIfSelected
              : styles.lineContainer
          }
        >
          <Text
            style={this.props.isSelected ? styles.textIfSelected : styles.text}
            numberOfLines={
              this.props.numberOfLines ? this.props.numberOfLines : 1
            }
          >
            {this.props.label} {counterLabel}
          </Text>
        </TouchableOpacity>

        {this.props.notificationDisable ? null : (
          <TouchableOpacity
            activeOpacity={this.props.isSelected ? 1 : 0.2}
            onPress={() => this.props.onNotificationPress()}
            style={
              this.props.isSelected
                ? styles.pictoContainerSelected
                : styles.pictoContainer
            }
          >
            {this.props.isCityNotificationSelected ? (
              this.props.isSelected ? (
                <Icon
                  style={[styles.pictoSelected]}
                  name={pictoName}
                  size={20}
                />
              ) : (
                <Icon
                  style={[styles.pictoSelected]}
                  name={pictoName}
                  size={20}
                />
              )
            ) : (
              <Icon
                style={[
                  styles.pictoNotSelected,
                  this.props.isSelected ? { opacity: 0.5 } : null,
                ]}
                name={pictoNameO}
                size={20}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
