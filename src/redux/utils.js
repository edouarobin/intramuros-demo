import firebase from 'react-native-firebase';
import ENVIRONMENT from 'Intramuros/src/environment';
import { truncate } from 'lodash';

export const myFirebase = firebase;

export const logSubscribe = (cityId: number, cityName: string) => {
  try {
    console.log(
      'sending stats to firebase: log subscribe_city: ' +
        cityId +
        ', cityName: ' +
        cityName
    );
    myFirebase
      .analytics()
      .logEvent('subscribe_city', {
        item_id: cityId.toString(),
        item_name: cityName.toString(),
      });
  } catch (e) {
    console.log('Error sending log subscribe to firebase. Caught error', e);
  }
};

export const logUnSubscribe = (cityId: number, cityName: string) => {
  try {
    console.log(
      'sending stats to firebase: log unsubscribe_city: ' +
        cityId +
        ', cityName: ' +
        cityName
    );
    myFirebase
      .analytics()
      .logEvent('unsubscribe_city', {
        item_id: cityId.toString(),
        item_name: cityName.toString(),
      });
  } catch (e) {
    console.log('Error sending log unsubscribe to firebase. Caught error', e);
  }
};

export const logSubscribeAsso = (assoId: number, assoName: string) => {
  try {
    console.log(
      'sending stats to firebase: log subscribe_asso: ' +
        assoId +
        ', assoName: ' +
        assoName
    );
    myFirebase
      .analytics()
      .logEvent('subscribe_asso', {
        item_id: assoId.toString(),
        item_name: assoName.toString(),
      });
  } catch (e) {
    console.log('Error sending log subscribe to firebase. Caught error', e);
  }
};

export const logUnSubscribeAsso = (assoId: number, assoName: string) => {
  try {
    console.log(
      'sending stats to firebase: log unsubscribe_asso: ' +
        assoId +
        ', assoName: ' +
        assoName
    );
    myFirebase
      .analytics()
      .logEvent('unsubscribe_asso', {
        item_id: assoId.toString(),
        item_name: assoName.toString(),
      });
  } catch (e) {
    console.log('Error sending log unsubscribe to firebase. Caught error', e);
  }
};

export const logEvent = (
  eventId: number,
  title: string,
  cityName: string,
  cityId: number,
  isAgglo: boolean
) => {
  try {
    console.log(
      'sending stats to firebase: log Event: ' +
        title +
        ', ' +
        cityName +
        ', isAgglo: ' +
        isAgglo
    );
    myFirebase
      .analytics()
      .logEvent(isAgglo ? 'detail_event_agglo' : 'detail_event', {
        item_name: title,
        city_id: cityId.toString(),
        item_id: eventId.toString(),
        location: cityName,
        extra_data: cityId.toString() + '_' + eventId.toString() + '_' + title,
      });
  } catch (e) {
    console.log('Error sending log event to firebase. Caught error', e);
  }
};

export const logAnecdote = (id: number, title: string) => {
  try {
    console.log('sending stats to firebase: log Anecdote: ' + title);
    myFirebase
      .analytics()
      .logEvent('detail_anecdote', {
        item_name: title,
        item_id: id.toString(),
      });
  } catch (e) {
    console.log('Error sending log anecdote to firebase. Caught error', e);
  }
};

export const logNews = (
  id: number,
  title: string,
  cityName: string,
  cityId: number,
  isAgglo: boolean
) => {
  try {
    console.log(
      'sending stats to firebase: log News: ' +
        title +
        ', ' +
        cityName +
        ', isAgglo: ' +
        isAgglo
    );
    myFirebase
      .analytics()
      .logEvent(isAgglo ? 'detail_news_agglo' : 'detail_news', {
        item_name: title,
        city_id: cityId.toString(),
        item_id: id.toString(),
        location: cityName,
        extra_data: cityId.toString() + '_' + id.toString() + '_' + title,
      });
  } catch (e) {
    console.log('Error sending log news to firebase. Caught error', e);
  }
};

export const logPOI = (
  id: number,
  title: string,
  cityName: string,
  cityId: number
) => {
  try {
    console.log(
      'sending stats to firebase: log POI: ' + title + ', ' + cityName
    );
    myFirebase
      .analytics()
      .logEvent('detail_poi', {
        item_name: title,
        city_id: cityId.toString(),
        item_id: id.toString(),
        location: cityName,
        extra_data: cityId.toString() + '_' + id.toString() + '_' + title,
      });
  } catch (e) {
    console.log('Error sending log POI to firebase. Caught error', e);
  }
};

export const logSelectCity = (cityName: string, cityID: number) => {
  try {
    refreshUserPropertyWithSelectedCity(cityName, cityID);

    console.log(
      'logging event selected_city: city=' + cityName + ', id=' + cityID
    );
    myFirebase
      .analytics()
      .logEvent('select_city_' + ENVIRONMENT.ENV, {
        item_name: cityName,
        item_id: cityID.toString(),
      });
  } catch (e) {
    console.log('Error sending log select city to firebase. Caught error', e);
  }
};

export const logLaunchApp = (cityName, cityId) => {
  try {
    console.log('logging firebase launch_app for city: ' + cityName);
    myFirebase
      .analytics()
      .logEvent('launch_app', {
        item_name: cityName,
        item_id: cityId.toString(),
      });
  } catch (e) {
    console.log('Error sending log launch_app to firebase. Caught error', e);
  }
};

export const refreshUserPropertyWithSelectedCity = (
  cityName: string,
  cityID: number
) => {
  try {
    let cityPropertyName = cityName;
    if (cityPropertyName) {
      cityPropertyName = truncate(cityPropertyName, {
        length: 35,
        omission: '',
      });
    }
    console.log(
      'set/refresh user property: city=' + cityPropertyName + ', id=' + cityID
    );
    myFirebase
      .analytics()
      .setUserProperty('cityId_' + ENVIRONMENT.ENV, cityID.toString());
    myFirebase
      .analytics()
      .setUserProperty('city_' + ENVIRONMENT.ENV, cityPropertyName);
  } catch (e) {
    console.log('Error set/refresh user property to firebase. Caught error', e);
  }
};

export const logUnSelectCity = (cityName: string, cityID: number) => {
  try {
    console.log(
      'logging event unselect_city: city=' + cityName + ', id=' + cityID
    );
    myFirebase
      .analytics()
      .logEvent('unselect_city_' + ENVIRONMENT.ENV, {
        item_name: cityName,
        item_id: cityID.toString(),
      });
  } catch (e) {
    console.log('Error sending log unselect city to firebase. Caught error', e);
  }
};

export const getUserIdToken = () => {
  try {
    return myFirebase.auth().currentUser.uid;
  } catch (error) {
    console.log('error retrieving uid token firebase: ' + error);
    return null;
  }
};

export const logFavoriteSchool = (
  id: number,
  title: string,
  cityName: string,
  cityId: number
) => {
  try {
    console.log(
      'sending stats to firebase: log favorite school: ' +
        title +
        ', ' +
        cityName +
        ', ' +
        id +
        ', ' +
        cityId
    );
    myFirebase
      .analytics()
      .logEvent('favorite_school', {
        item_name: title,
        city_id: cityId.toString(),
        item_id: id.toString(),
        location: cityName,
      });
  } catch (e) {
    console.log(
      'Error sending log favorite school to firebase. Caught error',
      e
    );
  }
};

export const logFavoriteCommerce = (
  id: number,
  title: string,
  cityName: string,
  cityId: number
) => {
  try {
    console.log(
      'sending stats to firebase: log favorite commerce: ' +
        title +
        ', ' +
        cityName +
        ', ' +
        id +
        ', ' +
        cityId
    );
    myFirebase
      .analytics()
      .logEvent('favorite_commerce', {
        item_name: title,
        city_id: cityId.toString(),
        item_id: id.toString(),
        location: cityName,
      });
  } catch (e) {
    console.log(
      'Error sending log favorite commerce to firebase. Caught error',
      e
    );
  }
};

export const logSubscribeEventFilter = (
  filterId: number,
  title: string,
  isDelete: boolean
) => {
  try {
    console.log(
      'sending stats to firebase: log Subscribe Filter: ' +
        title +
        ', filter id:' +
        filterId +
        ', isDelete: ' +
        isDelete
    );
    myFirebase
      .analytics()
      .logEvent(isDelete ? 'unsubscribe_filter' : 'subscribe_filter', {
        item_name: title,
        item_id: filterId.toString(),
      });
  } catch (e) {
    console.log(
      'Error sending log Subscribe Filter to firebase. Caught error',
      e
    );
  }
};
