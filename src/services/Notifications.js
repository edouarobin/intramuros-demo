import { logEvent, logNews } from './../redux/utils';
import { Alert } from 'react-native';

const _logNewsOpen = (newsId: any, title: any, cityName: any, cityId: any) => {
  logNews(newsId, title, cityName, cityId, false);
};

const _logEventOpen = (
  eventID: any,
  eventTitle: any,
  cityName: any,
  cityId: any
) => {
  logEvent(eventID, eventTitle, cityName, cityId, false);
};

export const _processNotification = (
  notification: Notification,
  navigation: any
) => {
  if (navigation && notification && notification._data['_ID']) {
    const type = notification._data['_type'];
    if (type === 'survey') {
      //L'alerte est un sondage
      console.log(
        'Go to survey from notification. surveyID=' + notification._data['_ID']
      );
      navigation.navigate('Services');
      navigation.navigate('SurveyDetail', {
        surveyID: notification._data['_ID'],
        isNotification: true,
      });
    } else if (type === 'events') {
      //L'alerte est un Event
      _logEventOpen(
        notification._data['_ID'],
        notification._data['_title'],
        notification._data['_cityName'],
        notification._data['_cityId']
      );
      navigation.navigate('EventList');
      navigation.navigate('EventDetail', {
        eventID: notification._data['_ID'],
        isNotification: true,
      });
    } else if (type === 'news') {
      //L'alerte est une News
      _logNewsOpen(
        notification._data['_ID'],
        notification._data['_title'],
        notification._data['_cityName'],
        notification._data['_cityId']
      );

      navigation.navigate('News');
      navigation.navigate('NewsDetail', {
        newsID: notification._data['_ID'],
        notificationTitle: notification._data['_title'],
        notificationBody: notification._data['_body'],
        notificationImage: notification._data['_image'],
        notificationCityName: notification._data['_cityName'],
        notificationCityId: notification._data['_cityId'],
        notificationAssoId: notification._data['_assoId'],
        notificationAssoName: notification._data['_assoName'],
        notificationAssoPicto: notification._data['_assoPicto'],
        notificationAssoCity: notification._data['_assoCity'],
        isNotification: true,
      });
    } else {
      //Show a modal with the content
      Alert.alert(
        notification._data['_title'],
        notification._data['_body'],
        [{ text: 'Ok', onPress: () => {} }],
        {
          cancelable: false,
        }
      );
    }
  }
};
