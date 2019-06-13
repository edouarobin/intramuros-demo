// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { CardText, CardIntercoText } from 'Intramuros/src/components';
import globalStyle, { heightCard } from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';

type PropsType = {
  onPress: () => void,
  title: string,
  subtitle: string,
  subtitle2?: string,
  image: string,
  isAgglo?: boolean,
};

const styles = StyleSheet.create({
  cardContainer: {
    height: heightCard,
    width: 255,
    flex: 1,
    flexDirection: 'row',
    marginTop: 6,
    marginRight: 10,
    marginLeft: 2,
    marginBottom: 6,
    backgroundColor: 'white',
    ...globalStyle.shadow,
    borderRadius: 5,
  },
  imageContainer: {
    width: 96,
    height: heightCard,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default class LeftImageBoostEventCard extends PureComponent<PropsType> {
  render() {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={this.props.onPress}
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
        </View>
        <View style={styles.textContainer}>
          {this.props.isAgglo ? (
            <CardIntercoText title={this.props.title} cardType={'vertical'} />
          ) : (
            <CardText
              title={this.props.title}
              subtitle={this.props.subtitle}
              subtitle2={this.props.subtitle2}
              cardType={'vertical'}
              titleNumberOfLines={3}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
