// @flow

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import { formatDateAll } from 'Intramuros/src/services/FormatDate';
import { isToday, differenceInCalendarDays } from 'date-fns';

type PropsType = {
  survey: SurveysType,
  navigateToDetails: (pageName: string) => void,
  userHasAnswered: boolean,
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    ...globalStyle.shadow,
    elevation: 5,
    marginBottom: 18,
    paddingBottom: 9,
    zIndex: 999,
  },
  titleBlock: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'black',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  contentBlock: {
    padding: 16,
    paddingBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: globalStyle.colors.black,
    lineHeight: 24,
    paddingBottom: 12,
  },
  buttonBlock: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endingDateText: {
    fontFamily: 'Lato-Italic',
    fontSize: 14,
    color: '#868686',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    height: 45,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export const _calculateEndingSurvey = (endDate: any) => {
  if (!endDate) return '';

  if (isToday(endDate)) {
    return "aujourd'hui";
  }
  const countDownDays = differenceInCalendarDays(new Date(endDate), new Date());
  return 'dans ' + countDownDays + (countDownDays > 1 ? ' jours' : ' jour');
};

export default class SurveyCard extends PureComponent<PropsType> {
  render() {
    const { survey, userHasAnswered } = this.props;
    const surveyInProgress = survey ? survey.inProgress : false;
    const textToVote = userHasAnswered ? 'Changer mon vote' : 'Voter';

    return (
      <View style={styles.cardContainer}>
        <View style={styles.titleBlock}>
          <ImageBackground
            style={styles.image}
            imageStyle={{ opacity: 0.2 }}
            source={{ uri: survey.image ? survey.image : '' }}
            resizeMethod="resize"
            resizeMode="cover"
          >
            {
              <Text style={styles.titleText} numberOfLines={2}>
                {survey.title}
              </Text>
            }
          </ImageBackground>
        </View>
        <View style={styles.contentBlock}>
          {survey.description ? (
            <Text numberOfLines={3} style={styles.descriptionText}>
              {survey.description}
            </Text>
          ) : null}
          <View style={styles.buttonBlock}>
            <Text style={styles.endingDateText}>
              {surveyInProgress ? (
                <Text numberOfLines={2}>
                  {'Fin du vote '}
                  {_calculateEndingSurvey(survey.end_date)}
                </Text>
              ) : (
                <Text numberOfLines={2}>
                  {'Terminé le '}
                  {formatDateAll(survey.end_date)}
                </Text>
              )}
            </Text>
            {!surveyInProgress && survey.onlyFreeQuestion ? null : (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: surveyInProgress ? '#2ADA86' : '#2D9CF4' },
                ]}
                onPress={() =>
                  surveyInProgress
                    ? this.props.navigateToDetails('SurveyDetail')
                    : this.props.navigateToDetails('SurveyDetailResult')
                }
              >
                <Text style={styles.buttonText}>
                  {surveyInProgress ? (
                    <Text>{textToVote}</Text>
                  ) : (
                    <Text>{'Voir les résultats'}</Text>
                  )}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
