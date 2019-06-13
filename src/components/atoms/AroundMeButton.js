// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import AroundMeIcon from 'Intramuros/src/assets/AroundMeIcon.png';

type PropsType = {
  onPress: () => Promise<*>,
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    marginTop: 10,
    paddingLeft: 16,
    backgroundColor: globalStyle.colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyle.colors.yellow,
    borderRadius: 50,
  },
  icon: {
    width: 18,
    height: 20,
  },
  textContainer: {
    width: 135,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: 'black',
    lineHeight: 20,
    //fontWeight: 'bold',
  },
});

export default class AroundMeButton extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.onPress()}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={AroundMeIcon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Me géolocaliser</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
