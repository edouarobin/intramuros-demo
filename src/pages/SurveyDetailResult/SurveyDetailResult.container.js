// @flow
import { connect } from 'react-redux';
import SurveyDetailResult from './SurveyDetailResult.component';
import { selectors } from 'Intramuros/src/redux/surveys';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  survey: ownProps.navigation.state.params.survey,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyDetailResult);
