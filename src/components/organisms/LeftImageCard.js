// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import {
  CardText,
  CalendarDate,
  CardIntercoText,
} from 'Intramuros/src/components';
import globalStyle, { heightCard } from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  onPress: () => void,
  title: string,
  subtitle: string,
  subtitle2?: string,
  image: string,
  yellowLabel?: string,
  item: EventType,
};

const styles = StyleSheet.create({
  cardContainer: {
    height: heightCard,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
    marginRight: 2,
    marginLeft: 2,
    ...globalStyle.shadow,
  },
  imageContainer: {
    width: 96,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: heightCard,
  },
});

export default class LeftImageCard extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => this.props.onPress(this.props.item)}
      >
        <View style={styles.imageContainer}>
          <MyFastImage
            style={styles.image}
            source={{
              uri: this.props.image,
              priority: 'normal',
            }}
            resizeMode={'cover'}
          />
          {this.props.yellowLabel ? (
            <CalendarDate date={this.props.yellowLabel} />
          ) : null}
        </View>
        <View style={styles.textContainer}>
          {this.props.isAgglo ? (
            <CardIntercoText
              title={this.props.title}
              subtitle={this.props.subtitle}
              cardType={'vertical'}
            />
          ) : (
            <CardText
              title={this.props.title}
              subtitle={this.props.subtitle}
              subtitle2={this.props.subtitle2}
              cardType={'vertical'}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
