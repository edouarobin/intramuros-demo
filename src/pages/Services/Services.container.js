// @flow
import { connect } from 'react-redux';

import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as directorySelector } from 'Intramuros/src/redux/directories';
import { selectors as surveySelector } from 'Intramuros/src/redux/surveys';
import { selectors as schoolSelector } from 'Intramuros/src/redux/schools';
import { selectors as commerceSelector } from 'Intramuros/src/redux/commerces';

import directoriesActionCreators from 'Intramuros/src/redux/directories/actionCreators';
import { selectors as associationSelector } from 'Intramuros/src/redux/associations';
import surveysActionCreators from 'Intramuros/src/redux/surveys/actionCreators';
import schoolsActionCreators from 'Intramuros/src/redux/schools/actionCreators';
import assosActionCreators from 'Intramuros/src/redux/associations/actionCreators';
import commercesActionCreators from 'Intramuros/src/redux/commerces/actionCreators';

import Services from './Services.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  directories: directorySelector.directories(rootState),
  directoriesLoading: directorySelector.getDirectoriesLoading(rootState),
  surveys: surveySelector.surveys(rootState),
  selectedCity: citySelectors.selectedCity(rootState),
  surveyLoading: surveySelector.getSurveysLoading(rootState),
  schools: schoolSelector.schools(rootState),
  schoolLoading: schoolSelector.getSchoolsLoading(rootState),
  commerces: commerceSelector.commerces(rootState),
  commerceLoading: commerceSelector.getCommercesLoading(rootState),
  associations: associationSelector.assos(rootState),
  associationLoading: associationSelector.getAssosFromCityLoading(rootState),
});

const mapDispatchToProps = {
  fetchDirectories: () =>
    directoriesActionCreators.requestGetDirectoriesStart(),
  fetchSurveys: () => surveysActionCreators.requestGetSurveysStart(),
  fetchSurveyById: (id: number) =>
    surveysActionCreators.requestGetSurveyFromIdStart({ id }),
  fetchSchools: () => schoolsActionCreators.requestGetSchoolsStart(),
  fetchAssos: () => assosActionCreators.requestGetAssosStart(),
  fetchAssosFromCity: (id: number) =>
    assosActionCreators.requestGetAssosFromCityStart({ id }),
  fetchCommerces: () => commercesActionCreators.requestGetCommercesStart(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
