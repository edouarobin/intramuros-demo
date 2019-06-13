// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  label: string,
  onPress: any => void,
  isSelected: boolean,
  counter?: number,
  picto: string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.white,
  },
  lineContainer: {
    height: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 8,
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 8,
  },
  lineSelected: {
    backgroundColor: '#00B8A7',
  },
  lineEmpty: {
    backgroundColor: globalStyle.colors.white,
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    lineHeight: globalStyle.sizes.medium,
  },
  textNotSelected: {
    color: '#1D2129',
  },
  textSelected: {
    color: 'white',
  },
  counter: {
    fontFamily: 'Lato-Bold',
    fontSize: 13,
    lineHeight: globalStyle.sizes.medium,
  },
  counterNotSelected: {
    color: '#1D2129',
  },
  counterSelected: {
    color: 'white',
  },
  pictoContainer: {
    width: 27,
    height: 20,
    marginRight: 4,
  },
  picto: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default class LineFilterButton extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={[
            styles.lineContainer,
            this.props.isSelected ? styles.lineSelected : styles.lineEmpty,
          ]}
        >
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={styles.pictoContainer}>
              <MyFastImage
                style={styles.picto}
                source={{
                  uri: this.props.picto,
                  priority: 'normal',
                }}
                resizeMode={'contain'}
              />
            </View>
            <Text
              style={[
                styles.text,
                this.props.isSelected
                  ? styles.textSelected
                  : styles.textNotSelected,
              ]}
              numberOfLines={1}
            >
              {this.props.label}
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Text
              style={[
                styles.counter,
                this.props.isSelected
                  ? styles.counterSelected
                  : styles.counterNotSelected,
              ]}
              numberOfLines={1}
            >
              {this.props.counter}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
