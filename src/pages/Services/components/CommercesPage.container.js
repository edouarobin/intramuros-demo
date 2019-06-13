// @flow
import { connect } from 'react-redux';

import { selectors as citySelectors } from 'Intramuros/src/redux/cities';
import { selectors as commerceSelector } from 'Intramuros/src/redux/commerces';
import commercesActionCreators from 'Intramuros/src/redux/commerces/actionCreators';

import CommercesPage from './CommercesPage.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any): * => ({
  selectedCity: citySelectors.selectedCity(rootState),
  commerces: commerceSelector.commerces(rootState),
  favoriteCommerces: commerceSelector.favoriteCommerces(rootState),
});

const mapDispatchToProps = {
  saveFavoriteCommerceId: (id: number) =>
    commercesActionCreators.saveFavoriteCommerceId(id),
  removeFavoriteCommerceId: (id: number) =>
    commercesActionCreators.removeFavoriteCommerceId(id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercesPage);
