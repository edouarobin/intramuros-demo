// @flow

import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { GoBackButton, Loader, MyFastImage } from 'Intramuros/src/components';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import request from 'superagent';
import ENV from 'Intramuros/src/environment';
import { split, forEach } from 'lodash';
import { formatDateAll } from 'Intramuros/src/services/FormatDate';

type PropsType = {
  navigation: NavigationPropsType<>,
  survey: SurveysType,
};

type StateType = {
  surveyResultFetched: boolean,
  surveyResultAggregated: any,
  fetchResultError: boolean,
};

export default class SurveyDetailResult extends PureComponent<
  PropsType,
  StateType
> {
  state = {
    surveyResultFetched: false,
    surveyResultAggregated: null,
    fetchResultError: false,
  };

  _computePossiblesAnswers(answers: string) {
    let possible_answers = [];
    if (answers) {
      options = split(answers, '/');
      forEach(options, option => {
        possible_answers.push(option);
      });
    }
    console.log(possible_answers);
    return possible_answers;
  }

  _updateStateWithSurveyresult = (surveyResult: any) => {
    if (surveyResult) {
      this.setState({
        surveyResultAggregated: surveyResult,
        surveyResultFetched: true,
      });
    } else {
      this.setState({
        surveyResultFetched: true,
        fetchResultError: true,
      });
    }
  };

  _getSurveyResultAggregated = (survey: any) => {
    if (survey && survey.id) {
      request
        .get(
          `${ENV.API_URL}/services/surveyresults_aggregated/?survey-id=` +
            survey.id
        )
        .then(response => response.body)
        .then(surveyResult =>
          this._updateStateWithSurveyresult(surveyResult[0])
        )
        .catch(error => {
          console.log('ERROR during fetch survey result call : ' + error);
          this.setState({
            surveyResultFetched: true,
            fetchResultError: true,
          });
        });
    } else {
      console.log('error: survey id is null !');
    }
  };

  _alert = (title: string, message: string, callback: any) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: callback }], {
      cancelable: false,
    });
  };

  _createAnswerResultsView = (
    possiblesAnswers: any,
    length: number,
    answers,
    totalResponses: number
  ) => {
    let table = [];
    let items = [];
    if (possiblesAnswers && answers && totalResponses > 0) {
      for (let i = 0; i < length; i++) {
        let answerName = possiblesAnswers[i];
        let answerCount = answers[answerName];
        let answerCountPercent = (answerCount / totalResponses) * 100;
        let percentWidth = answerCountPercent.toFixed(2) + '%';
        items.push(
          <View key={i}>
            <Text
              style={{
                textAlign: 'left',
                width: '100%',
                marginTop: 5,
                fontFamily: 'Lato-Regular',
              }}
              selectable={true}
            >
              {answerName}
              {' : '}
              {answerCountPercent.toFixed(2)}
              {'% ('}
              {answerCount}
              {answerCount > 1 ? ' votes)' : ' vote)'}
            </Text>
            <View
              style={{
                width: '100%',
                backgroundColor: globalStyle.colors.greyish,
                height: 30,
              }}
            >
              <View
                style={{
                  width: percentWidth,
                  backgroundColor: '#90B7F3',
                  height: 30,
                }}
              />
            </View>
          </View>
        );
      }
      items.push(
        <Text
          key={'key-total'}
          style={{
            textAlign: 'center',
            width: '100%',
            marginVertical: 5,
            fontFamily: 'Lato-Regular',
          }}
          selectable={true}
        >
          {'Nombre total de votes : '}
          {totalResponses}
        </Text>
      );
    }
    table.push(
      <View key={'key-container'} style={{ width: '100%' }}>
        {items}
      </View>
    );

    return table;
  };

  render() {
    const { survey } = this.props;
    if (!survey) {
      console.log('SurveyResult: nothing to display for the moment');
      return (
        <View
          style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}
        >
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

    const surveyInProgress = survey ? survey.inProgress : false;
    const possiblesAnswers1 = this._computePossiblesAnswers(survey.answer1);
    const possiblesAnswers2 = this._computePossiblesAnswers(survey.answer2);
    const possiblesAnswers3 = this._computePossiblesAnswers(survey.answer3);
    const possiblesAnswers4 = this._computePossiblesAnswers(survey.answer4);
    const possiblesAnswers5 = this._computePossiblesAnswers(survey.answer5);

    console.log(this.state.surveyResultAggregated);

    if (!this.state.surveyResultFetched) {
      console.log(
        'go to call result survey aggregated api for survey id = ' + survey.id
      );
      this._getSurveyResultAggregated(survey);
    }

    if (this.state.fetchResultError) {
      this._alert(
        'Oups ...',
        'Impossible de récupérer les résultats du sondage. Veuillez réessayer ultérieurement.',
        () => this.props.navigation.goBack()
      );
      return null;
    }

    const surveyResultAggregated = this.state.surveyResultAggregated;

    return (
      <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />
        <ScrollView>
          <GoBackButton navigation={this.props.navigation} color="black" />
          {!this.state.surveyResultFetched ? (
            <Loader
              isLoading={true}
              message="Chargement en cours"
              fullpage={true}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                width: '100%',
                padding: 16,
                paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontFamily: 'Lato-Bold',
                  width: '100%',
                }}
              >
                {survey.title}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontFamily: 'Lato-Italic',
                  width: '100%',
                  color: '#868686',
                  marginTop: 5,
                }}
              >
                {surveyInProgress ? "Sondage ouvert jusqu'au " : 'Terminé le '}
                {formatDateAll(survey.end_date)}
              </Text>
              {survey.image ? (
                <MyFastImage
                  style={{
                    height: 250,
                    width: '100%',
                    marginTop: 15,
                  }}
                  source={{
                    uri: survey.image,
                    priority: 'normal',
                  }}
                  localImage
                  resizeMode={'contain'}
                />
              ) : null}
              {survey.description ? (
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 14,
                    fontFamily: 'Lato-Regular',
                  }}
                  selectable={true}
                >
                  {survey.description}
                </Text>
              ) : null}
              {survey.question1 ? (
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontFamily: 'Lato-Bold',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                    selectable={true}
                  >
                    {survey.question1}
                  </Text>
                </View>
              ) : null}
              {survey.answer1 && surveyResultAggregated
                ? this._createAnswerResultsView(
                    possiblesAnswers1,
                    possiblesAnswers1.length,
                    surveyResultAggregated.answer1,
                    surveyResultAggregated.answer1TotalResponses
                  )
                : null}
              {survey.question2 ? (
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontFamily: 'Lato-Bold',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                    selectable={true}
                  >
                    {survey.question2}
                  </Text>
                </View>
              ) : null}
              {survey.answer2 && surveyResultAggregated
                ? this._createAnswerResultsView(
                    possiblesAnswers2,
                    possiblesAnswers2.length,
                    surveyResultAggregated.answer2,
                    surveyResultAggregated.answer2TotalResponses
                  )
                : null}
              {survey.question3 ? (
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontFamily: 'Lato-Bold',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                    selectable={true}
                  >
                    {survey.question3}
                  </Text>
                </View>
              ) : null}
              {survey.answer3 && surveyResultAggregated
                ? this._createAnswerResultsView(
                    possiblesAnswers3,
                    possiblesAnswers3.length,
                    surveyResultAggregated.answer3,
                    surveyResultAggregated.answer3TotalResponses
                  )
                : null}
              {survey.question4 ? (
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontFamily: 'Lato-Bold',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                    selectable={true}
                  >
                    {survey.question4}
                  </Text>
                </View>
              ) : null}
              {survey.answer4 && surveyResultAggregated
                ? this._createAnswerResultsView(
                    possiblesAnswers4,
                    possiblesAnswers4.length,
                    surveyResultAggregated.answer4,
                    surveyResultAggregated.answer4TotalResponses
                  )
                : null}
              {survey.question5 ? (
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontFamily: 'Lato-Bold',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                    selectable={true}
                  >
                    {survey.question5}
                  </Text>
                </View>
              ) : null}
              {survey.answer5 && surveyResultAggregated
                ? this._createAnswerResultsView(
                    possiblesAnswers5,
                    possiblesAnswers5.length,
                    surveyResultAggregated.answer5,
                    surveyResultAggregated.answer5TotalResponses
                  )
                : null}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
