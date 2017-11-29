import { put, takeEvery, select } from 'redux-saga/effects';
import Utils from '../../lib/utils';

import {
  updateField,
  clearUser,
  USER_INIT_SERVICE_TYPE,
  USER_UPDATE_SERVICE_TYPE,
} from '../actions/user';

import type {
  USER_UPDATE,
} from '../actions/user';

function* initUser() {
  try {
    const result = Utils.storage.getUser();

    // // validate token
    // if (result.Token && result.id) {
    //   const _url = `${Network.ME_URL}${result.id}/profile`;
    //   const userProfile = yield call([Utils.Api, Utils.Api.get], _url);
    //   result.name = userProfile.name;
    //   result.userName = userProfile.name;
    // }

    yield* updateUser({ payload: result });
  } catch (error) {
    yield put(clearUser());
  }
}

function* updateUser(action: USER_UPDATE) {
  const { payload } = action;
  try {
    yield put(updateField(payload));
    const { user } = yield select((state) => {
      return {
        user: { ...state.user },
      };
    });
    Utils.storage.setUser(user);
  } catch (error) {
    console.log('error.updateUserSaga', error);
  }
}

function* index() {
  yield [
    takeEvery(USER_INIT_SERVICE_TYPE, initUser),
    takeEvery(USER_UPDATE_SERVICE_TYPE, updateUser),
  ];
}

export default index;
