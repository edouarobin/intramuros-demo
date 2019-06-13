// @flow

import { put, all, takeLatest } from 'redux-saga/effects';

import { enhanceSagaCall } from 'Intramuros/src/redux/sagaEnhancer';

import { getSchools } from './api';
import { schoolNormalizer } from './normalizer';
import actionTypes from './actionTypes';
import actionCreators from './actionCreators';

export function* getSchoolsSaga(): Generator<*, *, *> {
  try {
    const schools: ApiSchoolType[] = yield enhanceSagaCall(getSchools, 'GET');
    const normalizedSchools: NormalizedSchoolType = schoolNormalizer(schools);
    const schoolsList = normalizedSchools.entities.schoolsList;
    const mapSchoolsToCities = schools.reduce(
      (mappedSchoolsToCities, currentSchool) => {
        const currentCity = currentSchool.city;
        if (mappedSchoolsToCities[currentCity]) {
          mappedSchoolsToCities[currentCity].push(currentSchool.id);
          return mappedSchoolsToCities;
        }
        const newMappedSchoolsToCities = mappedSchoolsToCities;
        newMappedSchoolsToCities[currentCity] = [currentSchool.id];
        return newMappedSchoolsToCities;
      },
      {}
    );
    yield put(
      actionCreators.requestGetSchoolsSuccess({
        schoolsList,
        schoolsIDs: normalizedSchools.result,
        mapSchoolsToCities,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.requestGetSchoolsFailed(err));
  }
}

export default function* schoolsRootSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.REQUEST.GET_SCHOOLS.START, getSchoolsSaga),
  ]);
}
