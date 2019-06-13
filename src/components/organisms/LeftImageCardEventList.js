// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { Subtitle, Title } from 'Intramuros/src/components';
import globalStyle, { heightCard } from 'Intramuros/src/style/globalStyle';
import { MyFastImage } from 'Intramuros/src/components';
import {
  onlyDayShort,
  numberOfDate,
  calculateEndDateLabel,
} from 'Intramuros/src/services/FormatDate';
import { isBefore, isToday, isSameDay } from 'date-fns';

type PropsType = {
  onPress: () => void,
  title: string,
  subtitle: string,
  subtitle2?: string,
  image: string,
  startDate: string,
  endDate: string,
  item: EventType,
};

const styles = StyleSheet.create({
  cardContainer: {
    height: heightCard,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
    marginRight: 2,
    marginLeft: 2,
    ...globalStyle.shadow,
    borderRadius: 5,
  },
  imageContainer: {
    width: 96,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: heightCard,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default class LeftImageCardEventList extends PureComponent<PropsType> {
  render() {
    let endDateLabel = null;
    let { startDate, endDate } = this.props;
    let now = new Date();

    //Si la date de début est avant aujourd'hui, on change la date à Aujourd'hui pour que ça soit cohérent à l'affichage.
    if (isBefore(startDate, now)) {
      startDate = now;
    }
    //Si l'événement dure plusieurs jours on affiche la date de fin
    if (!isSameDay(endDate, startDate)) {
      endDateLabel = calculateEndDateLabel(endDate);
    }

    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 6,
            paddingTop: heightCard * 0.05,
            paddingRight: 9,
            width: 46,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
              fontSize: 13,
              color: '#70757A',
            }}
          >
            {onlyDayShort(startDate, true)}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 4,
              fontFamily: 'Lato-Regular',
              fontSize: 17,
              color: 'black',
            }}
          >
            {numberOfDate(startDate)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => this.props.onPress(this.props.item)}
        >
          <View style={styles.imageContainer}>
            <MyFastImage
              style={styles.image}
              source={{
                uri: this.props.image,
                priority: 'normal',
              }}
              resizeMode={'cover'}
            />
          </View>
          <View style={styles.textContainer}>
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 9,
              }}
            >
              <Title
                title={this.props.title}
                numberOfLines={this.props.titleNumberOfLines}
              />

              {endDateLabel ? (
                <Text
                  style={{
                    color: globalStyle.colors.mainBlue,
                    fontSize: 14,
                    fontFamily: 'Lato-Regular',
                    paddingTop: 4,
                  }}
                  numberOfLines={1}
                >
                  {endDateLabel}
                </Text>
              ) : null}

              {this.props.subtitle ? (
                <Subtitle
                  subtitle={this.props.subtitle}
                  subtitle2={this.props.subtitle2}
                />
              ) : null}

              {this.props.isAgglo ? (
                <View
                  style={{
                    height: 22,
                    alignSelf: 'flex-start',
                    borderRadius: 18,
                    backgroundColor: '#FFD4D4',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      marginHorizontal: 8,
                      fontSize: 13,
                      fontFamily: 'Lato-BoldItalic',
                    }}
                  >
                    {'intercommunal'}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
