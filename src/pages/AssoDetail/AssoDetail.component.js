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

type PropsType = {
  navigation: NavigationPropsType<>,
  asso: AssosType,
  selectedAssosNotification: number[],
  toggleAssoNotification: (id: number, assoName: string) => void,
  associationLoading: boolean,
  fetchAssosFromCity: () => void,
  cityIdOfAsso: number,
};

const assoKeyExtractor = (item): string => `${item.id}`;

export default class AssoDetail extends PureComponent<PropsType> {
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
            title="Association"
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

  componentWillMount() {
    const { asso, associationLoading, cityIdOfAsso } = this.props;
    if (isEmpty(asso)) {
      console.log('Asso is empty:');
      console.log(cityIdOfAsso);
      console.log(associationLoading);
      if (cityIdOfAsso && !associationLoading) {
        console.log('Go fetch asso for city: ' + cityIdOfAsso);
        this.props.fetchAssosFromCity(cityIdOfAsso);
      }
    }
  }

  render() {
    const { asso, cityIdOfAsso } = this.props;

    if (isEmpty(asso)) {
      return this._renderLoading();
    }

    const coverSource = asso.cover
      ? { uri: asso.cover }
      : asso.category_image
      ? { uri: asso.category_image }
      : null;
    const isPopulated = !(
      asso.description ||
      asso.email ||
      asso.number ||
      asso.number2 ||
      asso.number3 ||
      asso.website ||
      asso.fax ||
      asso.schedule ||
      asso.price ||
      asso.address_label
    );

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
          title="Association"
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
                        this.props.toggleAssoNotification(asso.id, asso.name);
                      }}
                      style={{
                        padding: 10,
                      }}
                    >
                      {indexOf(this.props.selectedAssosNotification, asso.id) >
                      -1 ? (
                        <Icon
                          style={{ color: globalStyle.colors.yellow }}
                          name={'bell'}
                          size={30}
                        />
                      ) : (
                        <Icon
                          style={{ color: globalStyle.colors.grey }}
                          name={'bell-o'}
                          size={30}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.headerContainer}>
                  <View style={styles.logoContainer}>
                    <MyFastImage
                      style={styles.logo}
                      source={{
                        uri: asso.logo ? asso.logo : asso.category_picto,
                        priority: 'normal',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15 + overflowHeight,
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
                  {asso.name}
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
                  {asso.description ? (
                    <HTMLText
                      style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 14,
                        color: 'black',
                        textAlign: 'left',
                        lineHeight: 24,
                      }}
                      value={asso.description}
                      styleContainer={{ marginTop: 16 }}
                    />
                  ) : null}
                  {asso.schedule ? <Schedule text={asso.schedule} /> : null}
                  {asso.price ? <Price price={asso.price} /> : null}
                  {asso.address_label ||
                  asso.number ||
                  asso.number2 ||
                  asso.number3 ||
                  asso.fax ||
                  asso.email ||
                  asso.website ? (
                    <View
                      style={{
                        marginTop: 16,
                      }}
                    >
                      <Text style={styles.moreInfo}>
                        {'Pour nous contacter :'}
                      </Text>
                      {asso.address_label ? (
                        <ContactMap address={asso.address_label} />
                      ) : null}
                      {asso.number ? (
                        <ContactNumber number={asso.number} />
                      ) : null}
                      {asso.number2 ? (
                        <ContactNumber number={asso.number2} />
                      ) : null}
                      {asso.number3 ? (
                        <ContactNumber number={asso.number3} />
                      ) : null}
                      {asso.fax ? <ContactFax fax={asso.fax} /> : null}
                      {asso.email ? <ContactEmail email={asso.email} /> : null}
                      {asso.website ? (
                        <ContactWeb
                          website={asso.website}
                          icon={true}
                          fisrtElement={true}
                        />
                      ) : null}
                    </View>
                  ) : null}
                  {asso.twitter || asso.facebook ? (
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
                        {asso.facebook ? (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(asso.facebook);
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
                        {asso.twitter ? (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(asso.twitter);
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
