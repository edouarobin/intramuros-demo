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
} from 'react-native';
// $FlowFixMe
import LinearGradient from 'react-native-linear-gradient';

import {
  GoBackButtonWithGradient,
  ImageZoomModal,
  ContactWeb,
} from 'Intramuros/src/components';
import globalStyle, {
  anecdoteDetailImageHeight,
  STATUS_BAR_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import HTMLText from 'Intramuros/src/utils/HTMLText';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: anecdoteDetailImageHeight + STATUS_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
    lineHeight: 28,
    marginBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
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
  linearGradient: {
    position: 'absolute',
    flex: 1,
    zIndex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
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

type PropsType = {
  navigation: NavigationPropsType<>,
  anecdoteDetails: AnecdoteType,
};

export default class AnecdoteDetail extends PureComponent<PropsType> {
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
    return (
      <View style={styles.container}>
        <GoBackButtonWithGradient
          navigation={this.props.navigation}
          gradientColor="rgba(0,0,0,0.9)"
          goBackColor="white"
        />
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
          animated={true}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={this.openZoomImage}>
            <ImageBackground
              style={styles.image}
              source={{ uri: this.props.anecdoteDetails.image }}
            >
              <LinearGradient
                colors={['rgba(256,256,256,0)', 'rgba(0,0,0,0.9)']}
                style={styles.linearGradient}
              >
                <Text
                  numberOfLines={3}
                  ellipsizeMode={'tail'}
                  style={styles.titleStyle}
                >
                  {this.props.anecdoteDetails.title}
                </Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.descriptionContainer}>
            <HTMLText
              style={styles.decriptionStyle}
              value={this.props.anecdoteDetails.description}
            />
            {this.props.anecdoteDetails.url1 ||
            this.props.anecdoteDetails.url2 ||
            this.props.anecdoteDetails.url3 ? (
              <View style={styles.linksStyle}>
                <Text style={styles.moreInfo}>Plus d'informations :</Text>
                {this.props.anecdoteDetails.url1 ? (
                  <ContactWeb
                    website={this.props.anecdoteDetails.url1}
                    fisrtElement={true}
                  />
                ) : null}
                {this.props.anecdoteDetails.url2 ? (
                  <ContactWeb website={this.props.anecdoteDetails.url2} />
                ) : null}
                {this.props.anecdoteDetails.url3 ? (
                  <ContactWeb website={this.props.anecdoteDetails.url3} />
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
        <ImageZoomModal
          image={this.props.anecdoteDetails.image}
          modalVisible={this.state.modalVisible}
          closeImageModal={this.closeImageModal}
        />
      </View>
    );
  }
}
