// @flow

import React, { PureComponent } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {
  GoBackButtonWithTitleBlock,
  MyFastImage,
  ContactNumber,
  ContactEmail,
  ContactWeb,
  ContactFax,
  ContactMap,
  ImageZoomModal,
  Schedule,
  Price,
  Loader,
} from 'Intramuros/src/components';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { size, indexOf, isEmpty } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLText from 'Intramuros/src/utils/HTMLText';
import FacebookLogo from 'Intramuros/src/assets/facebook-logo.png';
import TwitterLogo from 'Intramuros/src/assets/twitter-logo.png';
import { logFavoriteCommerce } from '../../redux/utils';

type PropsType = {
  navigation: NavigationPropsType<>,
  commerce: CommercesType,
  favoriteCommerces: number[],
  saveFavoriteCommerceId: (id: number) => void,
  removeFavoriteCommerceId: (id: number) => void,
  commercesLoading: boolean,
  fetchCommerces: () => void,
};

const commerceKeyExtractor = (item): string => `${item.id}`;

export default class CommerceDetail extends PureComponent<PropsType> {
  state = {
    modalVisible: false,
  };

  openZoomImage = () => {
    this.setState({ modalVisible: true });
  };
  closeImageModal = () => {
    this.setState({ modalVisible: false });
  };

  _renderLoading = () => {
    //Need to wait
    return (
      <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />
        <ScrollView>
          <GoBackButtonWithTitleBlock
            navigation={this.props.navigation}
            color="black"
            title="Commerce"
          />
          <Loader
            isLoading={true}
            message="Chargement en cours"
            fullpage={true}
          />
        </ScrollView>
      </View>
    );
  };

  _logAddingCommerce = (
    commerceId: number,
    commerceName: string,
    cityId: number,
    cityName: string
  ) => {
    try {
      logFavoriteCommerce(commerceId, commerceName, cityName, cityId);
    } catch (e) {
      console.log(e);
    }
  };

  componentWillMount() {
    const { commerce, commercesLoading } = this.props;
    if (isEmpty(commerce)) {
      console.log('Commerce is empty:');
      console.log(commercesLoading);
      if (!commercesLoading) {
        console.log('Go fetch commerces');
        this.props.fetchCommerces();
      }
    }
  }

  render() {
    const {
      commerce,
      favoriteCommerces,
      saveFavoriteCommerceId,
      removeFavoriteCommerceId,
    } = this.props;

    if (isEmpty(commerce)) {
      return this._renderLoading();
    }

    const coverSource = commerce.cover
      ? { uri: commerce.cover }
      : commerce.category_image
      ? { uri: commerce.category_image }
      : null;
    const isPopulated = !(
      commerce.description ||
      commerce.email ||
      commerce.number ||
      commerce.number2 ||
      commerce.number3 ||
      commerce.website ||
      commerce.fax ||
      commerce.schedule ||
      commerce.price ||
      commerce.address_label
    );

    const isFavorite = indexOf(favoriteCommerces, commerce.id) > -1;

    return (
      <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />

        <GoBackButtonWithTitleBlock
          navigation={this.props.navigation}
          color="black"
          title="Commerce"
        />

        <ScrollView
          showsVerticalScrollIndicator={true}
          removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={this.openZoomImage}>
              <ImageBackground
                style={{}}
                source={coverSource}
                resizeMode="cover"
              >
                <View
                  style={{
                    position: 'absolute',
                    flex: 1,
                    zIndex: 1,
                    width: '100%',
                    height: 80,
                  }}
                >
                  <View style={styles.pictoContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (isFavorite) {
                          removeFavoriteCommerceId(commerce.id);
                        } else {
                          saveFavoriteCommerceId(commerce.id);
                          this._logAddingCommerce(
                            commerce.id,
                            commerce.name,
                            commerce.city,
                            commerce.cityName
                          );
                        }
                      }}
                      style={{
                        padding: 10,
                      }}
                    >
                      {isFavorite ? (
                        <Icon
                          style={{ color: globalStyle.colors.white }}
                          name={'heart'}
                          size={30}
                        />
                      ) : (
                        <Icon
                          style={{ color: globalStyle.colors.white }}
                          name={'heart-o'}
                          size={30}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.headerContainer}>
                  {/* <View style={styles.logoContainer}>
                    <MyFastImage
                      style={styles.logo}
                      source={{
                        uri: commerce.logo ? commerce.logo : commerce.category_picto,
                        priority: 'normal',
                      }}
                      resizeMode={'contain'}
                    />
                  </View> */}
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15, //+ overflowHeight,
                paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
              }}
            >
              <View>
                <Text
                  numberOfLines={3}
                  style={{
                    fontFamily: 'Lato-Bold',
                    fontSize: 20,
                    color: 'black',
                    textAlign: 'left',
                  }}
                >
                  {commerce.name}
                </Text>
              </View>

              {isPopulated ? (
                <View>
                  <Text
                    style={{
                      marginTop: 16,
                      marginBottom: 16,
                      height: 20,
                      fontSize: 12,
                      fontFamily: 'Lato-Regular',
                      color: globalStyle.colors.darkerGrey,
                      textAlign: 'center',
                    }}
                  >
                    {"Cette fiche n'a pas encore été complétée."}
                  </Text>
                </View>
              ) : (
                <View>
                  {commerce.description ? (
                    <HTMLText
                      style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 14,
                        color: 'black',
                        textAlign: 'left',
                        lineHeight: 24,
                      }}
                      value={commerce.description}
                      styleContainer={{ marginTop: 16 }}
                    />
                  ) : null}
                  {commerce.schedule ? (
                    <Schedule text={commerce.schedule} />
                  ) : null}
                  {commerce.price ? <Price price={commerce.price} /> : null}
                  {commerce.address_label ||
                  commerce.number ||
                  commerce.number2 ||
                  commerce.number3 ||
                  commerce.fax ||
                  commerce.email ||
                  commerce.website ? (
                    <View
                      style={{
                        marginTop: 16,
                      }}
                    >
                      <Text style={styles.moreInfo}>
                        {'Pour nous contacter :'}
                      </Text>
                      {commerce.address_label ? (
                        <ContactMap
                          address={commerce.address_label}
                          latitude={commerce.latitude}
                          longitude={commerce.longitude}
                        />
                      ) : null}
                      {commerce.number ? (
                        <ContactNumber number={commerce.number} />
                      ) : null}
                      {commerce.number2 ? (
                        <ContactNumber number={commerce.number2} />
                      ) : null}
                      {commerce.number3 ? (
                        <ContactNumber number={commerce.number3} />
                      ) : null}
                      {commerce.fax ? <ContactFax fax={commerce.fax} /> : null}
                      {commerce.email ? (
                        <ContactEmail email={commerce.email} />
                      ) : null}
                      {commerce.website ? (
                        <ContactWeb
                          website={commerce.website}
                          icon={true}
                          fisrtElement={true}
                        />
                      ) : null}
                    </View>
                  ) : null}
                  {commerce.twitter || commerce.facebook ? (
                    <View
                      style={{
                        marginTop: 16,
                      }}
                    >
                      <Text style={styles.moreInfo}>{'Réseaux sociaux'}</Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                      >
                        {commerce.facebook ? (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(commerce.facebook);
                            }}
                          >
                            <MyFastImage
                              style={styles.socialLogo}
                              source={FacebookLogo}
                              resizeMode={'contain'}
                              localImage
                            />
                          </TouchableOpacity>
                        ) : null}
                        {commerce.twitter ? (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(commerce.twitter);
                            }}
                          >
                            <MyFastImage
                              style={styles.socialLogo}
                              source={TwitterLogo}
                              resizeMode={'contain'}
                              localImage
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
          </View>
          <View style={{ height: 60 }} />
          {coverSource && coverSource.uri ? (
            <ImageZoomModal
              image={coverSource.uri}
              modalVisible={this.state.modalVisible}
              closeImageModal={this.closeImageModal}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const screenHeight = Dimensions.get('window').height;
const headerHeight = screenHeight * 0.22;
const dimensionLogo = headerHeight * 0.66;
const overflowHeight = dimensionLogo / 4;
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.lightGrey,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: headerHeight,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: -overflowHeight,
    width: dimensionLogo,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 0.1,
    borderColor: globalStyle.colors.greyishBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // marginTop: 5,
    width: dimensionLogo,
    height: dimensionLogo,
    borderRadius: 6,
  },
  pictoContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  pictoButton: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ECECF1',
  },
  text: {
    color: 'black',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: globalStyle.sizes.medium,
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center',
  },
  moreInfo: {
    fontFamily: 'Lato-BoldItalic',
    color: globalStyle.colors.greyishBrown,
    marginTop: 10,
    marginBottom: 5,
  },
  socialLogo: {
    width: 45,
    height: 45,
    margin: 5,
  },
});
