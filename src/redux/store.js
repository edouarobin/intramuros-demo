// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';

import sagaMiddleware from './sagaMiddleware';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(rootReducer, {}, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);

  const persistedStore = persistStore(store, null, () => {
    //Nothing
  });

  return { store, persistedStore };
};
