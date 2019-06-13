// @flow
import React, { PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView, FlatList } from 'react-native';
import { GoBackButtonWithTitleBlock } from 'Intramuros/src/components';
import { SurveyCard } from 'Intramuros/src/components';
import { getUserIdToken } from '../../../redux/utils';
import { indexOf } from 'lodash';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';

type PropsType = {
  navigation: any,
  selectedCity: CityType,
  surveys: SurveysDisplayableType,
  answeredSurveys: number[],
};

type StateType = {};

export default class SurveyPage extends PureComponent<PropsType, StateType> {
  render() {
    const { surveys, answeredSurveys } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />

        <GoBackButtonWithTitleBlock
          navigation={this.props.navigation}
          color="black"
          title="Sondages"
        />
        <ScrollView
          style={{
            backgroundColor: globalStyle.colors.lightGrey,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 16,
              paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
            }}
          >
            {surveys && surveys.length > 0 ? (
              <FlatList
                data={surveys}
                keyExtractor={(item): string => `${item.id}`}
                style={{ width: '100%' }}
                renderItem={({ item }) => (
                  <SurveyCard
                    survey={item}
                    userHasAnswered={indexOf(answeredSurveys, item.id) > -1}
                    navigateToDetails={pageName => {
                      this.props.navigation.navigate(pageName, {
                        survey: item,
                      });
                    }}
                  />
                )}
              />
            ) : (
              <Text
                style={{
                  backgroundColor: 'transparent',
                  fontFamily: 'Lato-Regular',
                  height: 50,
                }}
              >
                Aucun sondage dans cette commune pour le moment
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
