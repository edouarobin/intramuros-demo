// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { MyFastImage } from 'Intramuros/src/components';

import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  onPress: () => void,
  title: String,
  logo: String,
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ECECF1',
    borderRadius: 50,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  textContainer: {
    flexShrink: 1,
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: globalStyle.colors.middleBlue,
  },
});

export default class OrganizerCard extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={this.props.onPress}
      >
        <View>
          <MyFastImage
            style={{
              height: 35,
              width: 35,
              marginRight: 10,
            }}
            source={{
              uri: this.props.logo,
              priority: 'normal',
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
