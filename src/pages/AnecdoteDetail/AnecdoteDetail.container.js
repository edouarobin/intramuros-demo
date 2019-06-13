// @flow
import { connect } from 'react-redux';

import { selectors } from 'Intramuros/src/redux/anecdotes';

import AnecdoteDetail from './AnecdoteDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  anecdoteDetails: selectors.selectAnecdoteDetailsFromID(
    rootState,
    ownProps.navigation.state.params.anecdoteID
  ),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteDetail);
