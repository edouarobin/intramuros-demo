import { myFirebase } from '../redux/utils';
import ENVIRONMENT from 'Intramuros/src/environment';
const messaging = myFirebase.messaging();

export const subscribe = (topic: string) => {
  console.log('Subscribing notifications: ' + topic + '_' + ENVIRONMENT.ENV);
  try {
    messaging.subscribeToTopic(topic + '_' + ENVIRONMENT.ENV);
  } catch (error) {
    console.log('Error subscribing notification: ' + error);
  }
};

export const unSubscribe = (topic: string) => {
  console.log('UnSubscribing notifications: ' + topic + '_' + ENVIRONMENT.ENV);
  try {
    messaging.unsubscribeFromTopic(topic + '_' + ENVIRONMENT.ENV);
  } catch (error) {
    console.log('Error unsubscribing notification: ' + error);
  }
};
