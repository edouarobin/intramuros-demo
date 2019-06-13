// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  GoBackButton,
  EventDetailHeader,
  AddressLabel,
  ContactWeb,
  Schedule,
  Price,
  ImageZoomModal,
  Loader,
  OrganizerCard,
} from 'Intramuros/src/components';
import globalStyle, {
  eventDetailImageHeight,
  STATUS_BAR_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { HEIGHT } from 'Intramuros/src/components/atoms/EventDetailHeader';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { startDateCalendarFormat } from 'Intramuros/src/services/FormatDate';

import { MyFastImage } from 'Intramuros/src/components';
import HTMLText from 'Intramuros/src/utils/HTMLText';
import ENV from 'Intramuros/src/environment';
import { oneEventNormalizer } from '../../redux/events/normalizer';
import request from 'superagent';
import { is } from 'redux-saga/utils';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.lightGrey,
    flexGrow: 1,
  },
  image: {
    flex: 1,
    height: eventDetailImageHeight,
    //resizeMode: 'contain',
  },
  infoContainer: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 0,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: BIG_SCREEN_PADDING_OFFSET,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0,
    paddingBottom: 16,
    paddingRight: 16 + BIG_SCREEN_PADDING_OFFSET,
    paddingLeft: 16 + BIG_SCREEN_PADDING_OFFSET,
  },
  decriptionStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  authorStyle: {
    fontFamily: 'Lato-Italic',
    marginTop: 16,
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
    // fontStyle: 'italic',
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
});

type PropsType = {
  navigation: NavigationPropsType<>,
  eventDetails: EventType,
  isNotification: boolean,
  eventID: number,
};

export default class EventDetail extends PureComponent<PropsType> {
  state = {
    modalVisible: false,
    detailEventFetched: false,
    notifiedEventDetail: null,
  };

  _fetchEvent = (id: number) => {
    try {
      console.log(id);
      request
        .get(`${ENV.API_URL}/events/` + id + `/`)
        .then(response => response.body)
        .then(event => {
          const eventNormalized = oneEventNormalizer(event).entities.event[id];
          this.setState({
            detailEventFetched: true,
            notifiedEventDetail: eventNormalized,
          });
        })
        .catch(error => {
          console.log('ERROR during fetch event from notification : ' + error);
          this.setState({
            detailEventFetched: true,
            fetchEventError: true,
          });
        });
    } catch (error) {
      console.log('Error trying to fetch event detail: ' + error);
      this.setState({
        detailEventFetched: true,
        fetchEventError: true,
      });
    }
  };

  openCalendar = () => {
    const title = this.props.eventDetails.title;
    const location =
      this.props.eventDetails.addressLabel !== title
        ? this.props.eventDetails.addressLabel
        : '';
    const notes = this.props.eventDetails.description;
    const startDate = this.props.eventDetails.startDate + 'T08:00:00.000Z';
    const endDate = this.props.eventDetails.endDate
      ? this.props.eventDetails.endDate + 'T17:00:00.000Z'
      : null;

    var eventConfig = {
      title,
      location,
      notes,
      startDate,
      endDate: endDate ? endDate : startDate,
      allDay: true,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
          // These are two different identifiers on iOS.
          // On Android, where they are both equal and represent the event id, also strings.
          // when false is returned, the dialog was dismissed
          if (eventInfo) {
            console.warn(JSON.stringify(eventInfo));
          } else {
            console.warn('dismissed');
          }
        }
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

  openZoomImage = () => {
    this.setState({ modalVisible: true });
  };
  closeImageModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    let { eventID, isNotification, eventDetails } = this.props;

    if (isNotification && !this.state.detailEventFetched) {
      this._fetchEvent(eventID);
      //Need to wait fetch call ends
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
            animated={true}
          />
          <ScrollView>
            <GoBackButton navigation={this.props.navigation} color="black" />
            <Loader
              isLoading={true}
              message="Chargement en cours"
              fullpage={true}
            />
          </ScrollView>
        </View>
      );
    }

    if (this.state.fetchEventError && !eventDetails) {
      Alert.alert(
        'Oups !',
        "Impossible de récupérer les détails de l'évenement ...",
        [{ text: 'Ok', onPress: () => this.props.navigation.goBack() }],
        {
          cancelable: false,
        }
      );
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
            animated={true}
          />
          <ScrollView>
            <GoBackButton navigation={this.props.navigation} color="black" />
          </ScrollView>
        </View>
      );
    }

    if (isNotification && this.state.notifiedEventDetail) {
      console.log('event from notification call');
      eventDetails = this.state.notifiedEventDetail;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />
        {eventDetails ? (
          <ScrollView contentContainerStyle={styles.container}>
            <GoBackButton navigation={this.props.navigation} color="black" />
            <View style={styles.infoContainer}>
              <EventDetailHeader
                startDate={eventDetails.startDate}
                endDate={eventDetails.endDate}
                title={eventDetails.title}
                openCalendar={this.openCalendar}
              />

              <View
                style={{
                  marginHorizontal: 20,
                }}
              >
                <AddressLabel
                  address={eventDetails.addressLabel}
                  latitude={eventDetails.latitude}
                  longitude={eventDetails.longitude}
                  label={eventDetails.title}
                />
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <TouchableOpacity onPress={this.openZoomImage}>
                <MyFastImage
                  style={styles.image}
                  source={{
                    uri: eventDetails.image,
                    priority: 'normal',
                  }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <HTMLText
                style={styles.decriptionStyle}
                value={eventDetails.description}
                styleContainer={{ marginTop: 16 }}
              />
              {eventDetails.schedule ? (
                <Schedule text={eventDetails.schedule} />
              ) : null}
              {eventDetails.price ? <Price price={eventDetails.price} /> : null}
              {eventDetails.url1 || eventDetails.url2 || eventDetails.url3 ? (
                <View style={styles.linksStyle}>
                  <Text style={styles.moreInfo}>Plus d'informations :</Text>
                  {eventDetails.url1 ? (
                    <ContactWeb
                      website={eventDetails.url1}
                      fisrtElement={true}
                    />
                  ) : null}
                  {eventDetails.url2 ? (
                    <ContactWeb website={eventDetails.url2} />
                  ) : null}
                  {eventDetails.url3 ? (
                    <ContactWeb website={eventDetails.url3} />
                  ) : null}
                </View>
              ) : null}
              {eventDetails.author ? (
                <Text style={styles.authorStyle}>
                  Publié par {eventDetails.author}
                </Text>
              ) : (
                <View />
              )}

              {eventDetails.organizer ? (
                <OrganizerCard
                  title={eventDetails.organizer_name}
                  logo={
                    eventDetails.organizer_logo
                      ? eventDetails.organizer_logo
                      : eventDetails.organizer_category_picto
                  }
                  onPress={() => {
                    if (eventDetails.organizer_type === 'ASSO')
                      this.props.navigation.navigate('AssoDetail', {
                        assoId: eventDetails.organizer,
                        cityOfAsso: eventDetails.organizer_city,
                      });
                    if (eventDetails.organizer_type === 'COMMERCE')
                      this.props.navigation.navigate('CommerceDetail', {
                        commerceId: eventDetails.organizer,
                      });
                  }}
                />
              ) : null}
              <View style={{ height: 60 }} />
            </View>
          </ScrollView>
        ) : (
          <GoBackButton navigation={this.props.navigation} color="black" />
        )}
        {eventDetails && eventDetails.image ? (
          <ImageZoomModal
            image={eventDetails.image}
            modalVisible={this.state.modalVisible}
            closeImageModal={this.closeImageModal}
          />
        ) : null}
      </View>
    );
  }
}
