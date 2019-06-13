// @flow
import { myFirebase } from './redux/utils';
// Optional flow type
import { Alert } from 'react-native';

export default async (message: any) => {
  // handle your message
  console.log('DANS le bgMessaging');
  console.log(message);

  const notification = new myFirebase.notifications.Notification()
    .setNotificationId(message.messageId)
    .setTitle(message.data['_title'])
    .setBody(message.data['_body'])
    .setSound('Default')
    .setData(message.data);

  notification.android
    .setChannelId('alert-channel')
    .android.setColorized(true)
    .android.setColor('#2869e5')
    .android.setSmallIcon('ic_stat_intramuroslogo');

  // Display the notification
  myFirebase.notifications().displayNotification(notification);

  return Promise.resolve();
};
