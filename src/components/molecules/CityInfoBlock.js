// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import globalStyle, {
  screenWidth,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { web } from 'react-native-communications';
import {
  ImageZoomModal,
  CityInfoModal,
  MyFastImage,
} from 'Intramuros/src/components';

type PropsType = {
  cityDetails: CityType,
  disableMoreInfoLink: boolean,
};

type StateType = {
  modalVisible: boolean,
  modalInfoCityVisible: boolean,
};

export default class CityInfoBlock extends PureComponent<PropsType, StateType> {
  state = {
    modalVisible: false,
    modalInfoCityVisible: false,
  };

  openZoomImage = () => {
    this.setState({ modalVisible: true });
  };

  openCityInfoModal = () => {
    this.setState({ modalInfoCityVisible: true });
  };

  closeImageModal = () => {
    this.setState({ modalVisible: false });
  };

  closeCityInfoModal = () => {
    this.setState({ modalInfoCityVisible: false });
  };

  render() {
    const cityDetails = this.props.cityDetails;
    const disableMoreInfoLink = this.props.disableMoreInfoLink;
    return cityDetails ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openZoomImage} style={styles.image}>
          <MyFastImage
            style={styles.image}
            source={{
              uri: cityDetails.cover,
              priority: 'normal',
            }}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.leftBlock}>
            <TouchableOpacity
              onPress={this.openCityInfoModal}
              disabled={disableMoreInfoLink}
            >
              <View style={styles.imageContainer}>
                <MyFastImage
                  style={styles.logo}
                  source={{
                    uri: cityDetails.logo,
                    priority: 'normal',
                  }}
                  resizeMode={'contain'}
                />
                {!disableMoreInfoLink ? (
                  <Text style={styles.moreInfoText}>{"Plus d'infos"}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rightBlock}>
            <Text style={styles.subtitleStyle} numberOfLines={2}>
              {'Maire : '}
              {cityDetails.mayorName}
            </Text>
            <Text style={styles.subtitleStyle} numberOfLines={2}>
              {cityDetails.population} {'habitants'}
            </Text>
            {cityDetails.website ? (
              <TouchableOpacity onPress={() => web(cityDetails.website)}>
                <Text style={styles.linkStyle} numberOfLines={1}>
                  {cityDetails.website.replace(/^(https?:|)\/\//, '')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <ImageZoomModal
          image={cityDetails.cover}
          modalVisible={this.state.modalVisible}
          closeImageModal={this.closeImageModal}
        />

        <CityInfoModal
          cityDetails={cityDetails}
          modalVisible={this.state.modalInfoCityVisible}
          closeModal={this.closeCityInfoModal}
        />
      </View>
    ) : null;
  }
}

const WIDTH = screenWidth * 0.35 - 30 - BIG_SCREEN_PADDING_OFFSET;
const WIDTH_RIGHT = '65%';
const WIDTH_LEFT = '35%';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#D7D7D7',
  },
  image: {
    width: '100%',
    height: 128,
  },
  titleStyle: {
    width: WIDTH_RIGHT,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    color: 'white',
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  rightBlock: {
    width: WIDTH_RIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  leftBlock: {
    width: WIDTH_LEFT,
    marginTop: -WIDTH / 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  imageContainer: {
    // top: 0,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 0.1,
    borderColor: globalStyle.colors.greyishBrown,
    overflow: 'hidden',
  },
  logo: {
    // marginTop: 5,
    width: WIDTH,
    height: WIDTH,
  },
  subtitleStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: globalStyle.colors.greyishBrown,
    lineHeight: 20,
  },
  linkStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: globalStyle.colors.mainBlue,
    lineHeight: 20,
  },
  moreInfoText: {
    marginVertical: 5,
    fontFamily: 'Lato-Regular',
    fontSize: 13,
  },
});
