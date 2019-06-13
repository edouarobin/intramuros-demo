// @flow
import { connect } from 'react-redux';

import { selectors as commerceSelector } from 'Intramuros/src/redux/commerces';
import commercesActionCreators from 'Intramuros/src/redux/commerces/actionCreators';
import CommerceDetail from './CommerceDetail.component';

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  commerce: ownProps.navigation.state.params.commerce
    ? ownProps.navigation.state.params.commerce
    : commerceSelector.selectCommerceFromID(
        rootState,
        ownProps.navigation.state.params.commerceId
      ),
  favoriteCommerces: commerceSelector.favoriteCommerces(rootState),
  commercesLoading: commerceSelector.getCommercesLoading(rootState),
});

const mapDispatchToProps = {
  saveFavoriteCommerceId: (id: number) =>
    commercesActionCreators.saveFavoriteCommerceId(id),
  removeFavoriteCommerceId: (id: number) =>
    commercesActionCreators.removeFavoriteCommerceId(id),
  fetchCommerces: () => commercesActionCreators.requestGetCommercesStart(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommerceDetail);
