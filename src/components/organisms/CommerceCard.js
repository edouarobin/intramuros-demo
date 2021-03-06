// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import globalStyle from 'Intramuros/src/style/globalStyle';
import { MyFastImage, Title } from 'Intramuros/src/components';
import Icon from 'react-native-vector-icons/FontAwesome';

type PropsType = {
  removeFavoriteCommerce: () => void,
  onPress: () => void,
  commerce: CommercesType,
};

const height = 80;
const BORDER_RADIUS = 8;

const styles = StyleSheet.create({
  cardContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
    marginRight: 2,
    marginLeft: 2,
    borderRadius: BORDER_RADIUS,
    ...globalStyle.shadow,
  },
  imageContainer: {
    width: height,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3C88F4',
    paddingVertical: 16,
    paddingHorizontal: 9,
  },
  image: {
    width: '100%',
    height: height,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: 'white',
  },
  subtitleText: {
    color: '#1b1b1b',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    paddingTop: 4,
  },
  pictoHeart: {
    width: 44,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C88F4',
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});

export default class CommerceCard extends PureComponent<PropsType> {
  render() {
    const { commerce, removeFavoriteCommerce, onPress } = this.props;
    if (!commerce) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.imageContainer}>
          <MyFastImage
            style={styles.image}
            source={{
              uri: commerce.cover ? commerce.cover : commerce.category_image,
              priority: 'normal',
            }}
            resizeMode={'cover'}
          />
        </View>

        <View style={styles.textContainer}>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.text}>
            {commerce.name}
          </Text>
          <Text style={styles.subtitleText} numberOfLines={1}>
            {commerce.cityName}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={removeFavoriteCommerce}
          style={styles.pictoHeart}
        >
          <Icon style={{ color: 'white' }} name={'heart'} size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
