// @flow
import { connect } from 'react-redux';
import SurveyDetail from './SurveyDetail.component';
import surveysActionCreators from 'Intramuros/src/redux/surveys/actionCreators';
import { selectors } from 'Intramuros/src/redux/surveys';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  survey: ownProps.navigation.state.params.survey,
  surveyID: ownProps.navigation.state.params.surveyID,
  isNotification: ownProps.navigation.state.params.isNotification,
});

const mapDispatchToProps = {
  saveAnsweredSurveyId: (id: number) =>
    surveysActionCreators.saveAnsweredSurveyId(id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyDetail);
