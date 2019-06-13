// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Title } from 'Intramuros/src/components';
import Subtitle from '../atoms/Subtitle';

type PropsType = {
  title: string,
  cardType: 'horizontal' | 'vertical',
  titleNumberOfLines: number,
  subtitle?: string,
};

const styles = StyleSheet.create({
  horizontal: {
    paddingTop: 9,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  vertical: {
    paddingVertical: 16,
    paddingHorizontal: 9,
  },
});

export default class CardIntercoText extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles[this.props.cardType]}>
        <Title title={this.props.title} numberOfLines={2} />
        {this.props.subtitle ? (
          <Subtitle subtitle={this.props.subtitle} />
        ) : null}

        <View
          style={{
            height: 22,
            alignSelf: 'flex-start',
            borderRadius: 18,
            backgroundColor: '#FFD4D4',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <Text
            style={{
              color: 'white',
              marginHorizontal: 8,
              fontSize: 13,
              fontFamily: 'Lato-BoldItalic',
            }}
          >
            {'intercommunal'}
          </Text>
        </View>
      </View>
    );
  }
}
