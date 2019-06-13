// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  GoBackButtonWithGradient,
  AddressLabel,
  ContactWeb,
  Schedule,
  Price,
  ImageZoomModal,
} from 'Intramuros/src/components';
import globalStyle, {
  eventDetailImageHeight,
  STATUS_BAR_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';
import HTMLText from 'Intramuros/src/utils/HTMLText';

type PropsType = {
  navigation: NavigationPropsType<{
    pointOfInterestDetails: PointOfInterestType,
  }>,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.lightGrey,
    flexGrow: 1,
  },
  titleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black',
    lineHeight: 28,
    marginTop: 18,
    textAlign: 'center',
  },
  titleContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  categoryStyle: {
    fontFamily: 'Lato-Regular',
    marginTop: 5,
    fontSize: 14,
    color: globalStyle.colors.greyishBrown,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: eventDetailImageHeight + STATUS_BAR_HEIGHT,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
    paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
  },
  decriptionStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  linksStyle: {
    marginTop: 16,
  },
  moreInfo: {
    fontFamily: 'Lato-BoldItalic',
    color: globalStyle.colors.greyishBrown,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default class DiscoverDetail extends PureComponent<PropsType> {
  state = {
    modalVisible: false,
  };

  openZoomImage = () => {
    this.setState({ modalVisible: true });
  };
  closeImageModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const pointOfInterestDetails = this.props.navigation.state.params
      .pointOfInterestDetails;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
          animated={true}
        />
        <GoBackButtonWithGradient
          navigation={this.props.navigation}
          gradientColor="rgba(256,256,256,0.9)"
          goBackColor="black"
        />
        {pointOfInterestDetails ? (
          <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={this.openZoomImage}>
              <MyFastImage
                style={styles.image}
                source={{
                  uri: pointOfInterestDetails.images[0],
                  priority: 'normal',
                }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.titleStyle}>
                {pointOfInterestDetails.title}
              </Text>
              <Text style={styles.categoryStyle}>
                {pointOfInterestDetails.category}
                {pointOfInterestDetails.category &&
                pointOfInterestDetails.distanceToSelectedCity
                  ? ' — '
                  : null}
                {pointOfInterestDetails.distanceToSelectedCity
                  ? `${pointOfInterestDetails.distanceToSelectedCity} km`
                  : null}
              </Text>
              <AddressLabel
                address={pointOfInterestDetails.addressLabel}
                latitude={pointOfInterestDetails.latitude}
                longitude={pointOfInterestDetails.longitude}
                label={pointOfInterestDetails.title}
              />
            </View>
            <View style={styles.descriptionContainer}>
              <HTMLText
                style={styles.decriptionStyle}
                value={pointOfInterestDetails.description}
              />
              {pointOfInterestDetails.schedule ? (
                <Schedule text={pointOfInterestDetails.schedule} />
              ) : null}
              {pointOfInterestDetails.price ? (
                <Price price={pointOfInterestDetails.price} />
              ) : null}
              {pointOfInterestDetails.url1 ||
              pointOfInterestDetails.url2 ||
              pointOfInterestDetails.url3 ? (
                <View style={styles.linksStyle}>
                  <Text style={styles.moreInfo}>Plus d'informations :</Text>
                  {pointOfInterestDetails.url1 ? (
                    <ContactWeb
                      website={pointOfInterestDetails.url1}
                      fisrtElement={true}
                    />
                  ) : null}
                  {pointOfInterestDetails.url2 ? (
                    <ContactWeb website={pointOfInterestDetails.url2} />
                  ) : null}
                  {pointOfInterestDetails.url3 ? (
                    <ContactWeb website={pointOfInterestDetails.url3} />
                  ) : null}
                </View>
              ) : null}
            </View>
          </ScrollView>
        ) : null}
        {pointOfInterestDetails ? (
          <ImageZoomModal
            image={pointOfInterestDetails.images[0]}
            modalVisible={this.state.modalVisible}
            closeImageModal={this.closeImageModal}
          />
        ) : null}
      </View>
    );
  }
}
