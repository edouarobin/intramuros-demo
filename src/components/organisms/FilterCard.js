// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  onPress: () => void,
  id: number,
  title: string,
  picto: string,
  counter: number,
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 10,
    backgroundColor: '#ECECF1',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 3,
  },
  pictoContainer: {
    width: 27,
    height: 20,
    marginRight: 4,
    marginLeft: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#161616',
  },
  counterContainer: {
    flex: 1,
    marginRight: 8,
    marginTop: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  counterTextContainer: {
    flex: 1,
  },
  counter: {
    fontFamily: 'Lato-Bold',
    fontSize: 11,
    color: '#565656',
  },
  picto: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default class FilterCard extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={this.props.onPress}
      >
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
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.counterContainer}>
          <View style={styles.counterTextContainer}>
            <Text style={styles.counter} numberOfLines={1}>
              {this.props.counter > 50 ? '50+' : this.props.counter}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
