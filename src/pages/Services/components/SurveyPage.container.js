// @flow
import { connect } from 'react-redux';

import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as surveySelector } from 'Intramuros/src/redux/surveys';

import SurveyPage from './SurveyPage.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
  surveys: surveySelector.surveys(rootState),
  answeredSurveys: surveySelector.answeredSurveys(rootState),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyPage);
