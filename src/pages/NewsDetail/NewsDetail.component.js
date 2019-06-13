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
  GoBackButton,
  ContactWeb,
  Schedule,
  Price,
  ImageZoomModal,
  OrganizerCard,
} from 'Intramuros/src/components';
import globalStyle, {
  newsDetailImageHeight,
  STATUS_BAR_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { formatDateWOweekday } from 'Intramuros/src/services/FormatDate';
import { MyFastImage } from 'Intramuros/src/components';
import HTMLText from 'Intramuros/src/utils/HTMLText';

type PropsType = {
  navigation: NavigationPropsType<>,
  newsDetails: NewsType,
  isNotification: boolean,
  notificationTitle?: string,
  notificationBody: ?string,
  notificationImage?: string,
  notificationCityName?: string,
  notificationCityId?: string,
  notificationAssoId?: string,
  notificationAssoName?: string,
  notificationAssoPicto?: string,
  notificationAssoCity?: string,
};

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 23,
  },
  titleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black',
    lineHeight: 28,
    textAlign: 'center',
  },
  dateStyle: {
    fontFamily: 'Lato-Regular',
    marginTop: 8,
    fontSize: 14,
    color: globalStyle.colors.greyishBrown,
    textAlign: 'center',
  },
  seperator: {
    marginTop: 12,
    backgroundColor: globalStyle.colors.yellow,
    height: 2,
    width: 96,
    borderRadius: 1,
  },
  image: {
    flex: 1,
    marginTop: 23,
    width: '100%',
    height: newsDetailImageHeight + STATUS_BAR_HEIGHT,
  },
  descriptionContainer: {
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
    // fontStyle: 'italic',
    // fontWeight: 'bold',
    color: globalStyle.colors.greyishBrown,
    marginTop: 10,
    marginBottom: 5,
  },
  authorStyle: {
    fontFamily: 'Lato-Italic',
    marginTop: 16,
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
    // fontStyle: 'italic',
  },
});

export default class NewsDetail extends PureComponent<PropsType> {
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
    let {
      isNotification,
      newsDetails,
      notificationImage,
      notificationTitle,
      notificationBody,
      notificationCityName,
      notificationAssoId,
      notificationAssoName,
      notificationAssoPicto,
      notificationAssoCity,
    } = this.props;
    let details = {
      title: '',
      city: '',
      date: '',
      image: '',
      description: '',
      schedule: '',
      price: '',
      url1: '',
      url2: '',
      url3: '',
      author: '',
      organizer: '',
      organizer_city: null,
      organizer_name: '',
      organizer_logo: '',
      organizer_type: '',
    };
    //Notification or News
    if (isNotification) {
      details.title = notificationTitle;
      details.city = notificationCityName;
      details.description = notificationBody;
      details.image = notificationImage;
      details.organizer = notificationAssoId;
      details.organizer_city = notificationAssoCity;
      details.organizer_name = notificationAssoName;
      details.organizer_logo = notificationAssoPicto;
      details.organizer_type = 'ASSO';
    } else if (newsDetails) {
      details.title = newsDetails.title;
      details.description = newsDetails.description;
      details.image = newsDetails.image;
      details.date = newsDetails.updatedAt;
      details.schedule = newsDetails.schedule;
      details.price = newsDetails.price;
      details.url1 = newsDetails.url1;
      details.url2 = newsDetails.url2;
      details.url3 = newsDetails.url3;
      details.author = newsDetails.author;
      details.organizer = newsDetails.organizer;
      details.organizer_city = newsDetails.organizer_city;
      details.organizer_name = newsDetails.organizer_name;
      details.organizer_logo = newsDetails.organizer_logo
        ? newsDetails.organizer_logo
        : newsDetails.organizer_category_picto;
      details.organizer_type = newsDetails.organizer_type;
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GoBackButton
          navigation={this.props.navigation}
          color={globalStyle.colors.mainBlue}
        />
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
          animated={true}
        />

        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{details.title}</Text>
            {details.city ? (
              <Text style={styles.dateStyle}>{details.city}</Text>
            ) : null}
            {details.date ? (
              <Text style={styles.dateStyle}>
                Publié le {formatDateWOweekday(details.date)}
              </Text>
            ) : null}
            <View style={styles.seperator} />
          </View>
          {details.image ? (
            <TouchableOpacity onPress={this.openZoomImage}>
              <MyFastImage
                style={styles.image}
                source={{
                  uri: details.image,
                  priority: 'normal',
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : null}
          <View style={styles.descriptionContainer}>
            <HTMLText
              style={styles.decriptionStyle}
              value={details.description ? details.description : ''}
            />
            {details.schedule ? <Schedule text={details.schedule} /> : null}
            {details.price ? <Price price={details.price} /> : null}
            {details.url1 || details.url2 || details.url3 ? (
              <View style={styles.linksStyle}>
                <Text style={styles.moreInfo}>Plus d'informations :</Text>
                {details.url1 ? (
                  <ContactWeb website={details.url1} fisrtElement={true} />
                ) : null}
                {details.url2 ? <ContactWeb website={details.url2} /> : null}
                {details.url3 ? <ContactWeb website={details.url3} /> : null}
              </View>
            ) : null}
            {details.author ? (
              <Text style={styles.authorStyle}>
                Publié par {details.author}
              </Text>
            ) : (
              <View />
            )}

            {details.organizer ? (
              <OrganizerCard
                title={details.organizer_name}
                logo={details.organizer_logo}
                onPress={() => {
                  if (details.organizer_type === 'ASSO')
                    this.props.navigation.navigate('AssoDetail', {
                      assoId: details.organizer,
                      cityOfAsso: details.organizer_city,
                    });
                  if (details.organizer_type === 'COMMERCE')
                    this.props.navigation.navigate('CommerceDetail', {
                      commerceId: details.organizer,
                    });
                }}
              />
            ) : null}

            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
        {details.image ? (
          <ImageZoomModal
            image={details.image}
            modalVisible={this.state.modalVisible}
            closeImageModal={this.closeImageModal}
          />
        ) : null}
      </View>
    );
  }
}
