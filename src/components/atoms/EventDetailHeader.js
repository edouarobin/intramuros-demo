// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import globalStyle, {
  calendarContainerHeight,
  calendarContainerWidth,
} from 'Intramuros/src/style/globalStyle';
import {
  formatDateLong,
  formatDateShort,
  formatDateDay,
  formatDateMonth,
  formatDateDayNumber,
} from 'Intramuros/src/services/FormatDate';

export const HEIGHT = 40;

type PropsType = {
  startDate: string,
  endDate: string,
  title: string,
  openCalendar: any,
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyle.colors.yellow,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  dateStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: 'black',
    marginTop: 10,
  },
  titleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    // fontWeight: 'bold',
    color: 'black',
    lineHeight: 26,
  },
  calendarContainer: {
    height: calendarContainerHeight,
    width: calendarContainerWidth,
    backgroundColor: 'white',
    ...globalStyle.shadow,
    elevation: 5,
    borderRadius: 6,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default class EventDetailHeader extends PureComponent<PropsType> {
  displayDate = (startDate: string, endDate: string) => {
    if (startDate === endDate) {
      return formatDateLong(startDate, true);
    }
    return `Du ${formatDateLong(startDate, false)} au ${formatDateLong(
      endDate,
      false
    )}`;
  };

  render() {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.calendarContainer}
            onPress={this.props.openCalendar}
          >
            <View
              style={{
                height: calendarContainerHeight * 0.3,
                width: '100%',
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                backgroundColor: globalStyle.colors.yellow,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Lato-Regular',
                }}
              >
                {formatDateMonth(this.props.startDate)}
              </Text>
            </View>

            <View
              style={{
                height: calendarContainerHeight * 0.7,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 22,
                  color: 'black',
                  fontFamily: 'Lato-Bold',
                }}
              >
                {formatDateDayNumber(this.props.startDate)}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'Lato-Bold',
                  marginBottom: 5,
                }}
              >
                {formatDateDay(this.props.startDate)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1,
            flexWrap: 'wrap',
            marginRight: 15,
          }}
        >
          <Text
            numberOfLines={6}
            ellipsizeMode={'tail'}
            style={styles.titleStyle}
          >
            {this.props.title}
          </Text>
          {this.props.startDate !== this.props.endDate ? (
            <Text style={styles.dateStyle} numberOfLines={2}>
              {this.displayDate(this.props.startDate, this.props.endDate)}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}
