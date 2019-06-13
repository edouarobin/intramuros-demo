// @flow

import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const toasterHeight = 25;
export const eventDetailImageHeight = screenHeight * 0.4;
export const newsDetailImageHeight = screenHeight * 0.4;
export const anecdoteDetailImageHeight = screenHeight * 0.45;
export const eventDetailGradient = eventDetailImageHeight * 0.5;
export const heightCard = 112; // Height of event and news cards.
export const IOS_STATUS_BAR_HEIGHT = getStatusBarHeight(true);
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const calendarContainerHeight = 66;
export const calendarContainerWidth = 62;
export const HEADER_HEIGHT_MODAL =
  Platform.OS === 'android' ? 58 : 58 + STATUS_BAR_HEIGHT;
export const NUMBER_OF_LINES = 50;
export const NUM_EVENT_THRESHOLD = 20;
export const TAB_HEIGHT = 56;
export const SECTION_EVENT_HEIGHT = 50;
export const BIG_SCREEN_PADDING_OFFSET = DeviceInfo.isTablet() ? 50 : 0;

const globalStyle = {
  font: {
    size: {
      large: 18,
    },
  },
  colors: {
    transparent: 'transparent',
    lighterBlue: '#4283ff',
    mainBlue: '#2869e5',
    darkBlue: '#001a94',
    middleBlue: '#1355b7',
    white: '#FFFFFF',
    lightGrey: '#F8F8F8',
    grey: '#e4e4e4',
    greyish: '#d7d7d7',
    darkerGrey: '#7d7d7d',
    greyishBrown: '#535353',
    greyLight: '#CBCBCB',
    greyUltraLight: '#F5F5FA',
    greyMegaLight: '#FCFCFE',
    black: '#000000',
    yellow: '#FFD153',
  },
  sizes: {
    medium: 20,
    headerHeight: 58 + STATUS_BAR_HEIGHT,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: 'white',
  },
};

export const headerTitle = {
  //width: 250,
  fontFamily: 'Lato-Bold',
  //fontWeight: "400", //Ne doit pas dépasser 400 sinon la family ne s'applique plus sur Android
  color: globalStyle.colors.white,
  fontSize: 16, //globalStyle.font.size.large,
  lineHeight: globalStyle.sizes.medium,
  textAlign: 'center',
  alignSelf: 'center',
};

export const headerContainer = {
  paddingTop: STATUS_BAR_HEIGHT,
  backgroundColor: globalStyle.colors.mainBlue,
  height: globalStyle.sizes.headerHeight,
  borderBottomWidth: 0,
  shadowRadius: 5,
  shadowColor: 'black',
  shadowOpacity: 1, //iOS
  elevation: 5, //Android
  zIndex: 999,
};

export default globalStyle;
