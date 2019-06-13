// @flow

import { call, put } from 'redux-saga/effects';

import { actionCreators as toasterActionCreators } from 'Intramuros/src/redux/toaster';

export function* enhanceSagaCall(
  asyncCall: (any, ...any) => any,
  method: string,
  ...callArgs: any
): Generator<any, any, any> {
  try {
    const result = yield call(asyncCall, ...callArgs);
    return result;
  } catch (err) {
    const message =
      method === 'GET' ? 'Erreur de chargement' : `Erreur d'envoi`;
    yield put(toasterActionCreators.show(message));
    throw err;
  }
}
