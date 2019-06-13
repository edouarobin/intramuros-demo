// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyle, {
  STATUS_BAR_HEIGHT,
} from 'Intramuros/src/style/globalStyle';

type PropsType = {
  navigation: any,
  color: string,
};

const styles = StyleSheet.create({
  rootcontainer: {
    paddingTop: 8 + STATUS_BAR_HEIGHT,
    paddingHorizontal: 8,
  },
  button: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  icon: {
    marginHorizontal: 8,
    backgroundColor: 'transparent',
    color: 'black',
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    backgroundColor: 'transparent',
    color: 'black',
  },
});

export default class GoBackButton extends PureComponent<PropsType> {
  render() {
    const color = this.props.color;
    return (
      <View style={styles.rootcontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <View style={styles.buttonContainer}>
            <Icon
              style={[styles.icon, { color }]}
              name="angle-left"
              size={36}
            />
            <Text style={[styles.text, { color }]}>Retour</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
