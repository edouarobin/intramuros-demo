// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { Subtitle, Title } from 'Intramuros/src/components';

type PropsType = {
  title: string,
  subtitle?: string,
  subtitle2?: string,
  cardType: 'horizontal' | 'vertical',
  titleNumberOfLines: number,
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

export default class CardText extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles[this.props.cardType]}>
        <Title
          title={this.props.title}
          numberOfLines={this.props.titleNumberOfLines}
        />
        {this.props.subtitle ? (
          <Subtitle
            subtitle={this.props.subtitle}
            subtitle2={this.props.subtitle2}
          />
        ) : null}
      </View>
    );
  }
}
