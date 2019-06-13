// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  onPress: () => void,
  title: String,
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 30,
    borderWidth: 1.5,
    borderColor: '#ECECF1',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: globalStyle.colors.middleBlue,
  },
});

export default class OtherFilterCard extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={this.props.onPress}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
