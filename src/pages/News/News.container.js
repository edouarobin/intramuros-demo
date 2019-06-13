// @flow
import { connect } from 'react-redux';

import { selectors as newsSelectors } from 'Intramuros/src/redux/news';
import { selectors as anecdotesSelectors } from 'Intramuros/src/redux/anecdotes';
import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import newsActionCreators from 'Intramuros/src/redux/news/actionCreators';
import anecdotesActionCreators from 'Intramuros/src/redux/anecdotes/actionCreators';

import News from './News.component';

const mapStateToProps = (rootState: RootStateType): * => ({
  selectCityFromID: cityID => citySelectors.cityFromID(rootState, cityID),
  selectAggloFromID: aggloID => citySelectors.aggloFromID(rootState, aggloID),
  selectedCity: citySelectors.selectedCity(rootState),
  isAroundMeSelected: citySelectors.isAroundMeSelected(rootState),
  news: newsSelectors.news(rootState),
  anecdotes: anecdotesSelectors.anecdotes(rootState),
  newsLoading: newsSelectors.getNewsLoading(rootState),
  anecdotesLoading: anecdotesSelectors.getAnecdotesLoading(rootState),
});

const mapDispatchToProps = {
  fetchNews: () => newsActionCreators.requestGetNewsStart(),
  fetchAnecdotes: () => anecdotesActionCreators.requestGetAnecdotesStart(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
