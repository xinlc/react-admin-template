import { put, call, takeEvery, select } from 'redux-saga/effects';
import { Modal } from 'antd';
import { clearUser, updateUser } from '../actions/user';
import Network from '../../config/network';
import Utils from '../../lib/utils';

import {
  updateField,
  AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE,
  AUTH_FETCH_CAPTCHA_SERVICE_TYPE,
  AUTH_MOBILE_SUBMIT_SERVICE_TYPE,
  AUTH_LOGOUT_SERVICE_TYPE,
  AUTH_SEND_SMS_SERVICE_TYPE,
  AUTH_REGISTER_SUBMIT_SERVICE_TYPE,
} from '../actions/auth';

import type {
  AUTH_ACCOUNT_SUBMIT,
  AUTH_SEND_SMS,
  AUTH_LOGOUT,
  AUTH_MOBILE_SUBMIT,
  AUTH_FETCH_CAPTCHA,
  AUTH_REGISTER_SUBMIT,
} from '../actions/auth';

function* accountSubmit(action:AUTH_ACCOUNT_SUBMIT) {
  const { userName, password, captchaImgId, captcha, callback } = action.payload;
  try {
    yield put(updateField({ submitting: true }));
    const url = `${Network.AUTH_URL}/broker/web/login`;
    const body = {
      userId: userName,
      password,
      imgId: captchaImgId,
      verifyCode: captcha,
    };
    const result = yield call([Utils.Api, Utils.Api.post], url, body);
    yield put(updateUser({
      id: result.id,
      hasPassword: result.hasPassword,
      phone: result.phone,
      photo: result.photo,
      Token: result.token,
      name: result.userName,
      birthday: result.birthday,
      contactNumber: result.contactNumber,
      gender: result.gender,
      hasFullAuth: result.hasFullAuth,
      signature: result.signature,
    }));
    callback(result);
    yield put(updateField({ submitting: false }));
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  } finally {
    yield put(updateField({ submitting: false }));
  }
}

function* mobileSubmit(action:AUTH_MOBILE_SUBMIT) {
  const { phone, smsCode, callback } = action.payload;
  try {
    yield put(updateField({ submitting: true }));

    const url = `${Network.AUTH_URL}/broker/web/sms/login`;
    const body = {
      phone,
      phoneVerifyCode: smsCode,
    };
    const result = yield call([Utils.Api, Utils.Api.post], url, body);
    yield put(updateUser({
      id: result.id,
      hasPassword: result.hasPassword,
      phone: result.phone,
      photo: result.photo,
      Token: result.token,
      name: result.userName,
      birthday: result.birthday,
      contactNumber: result.contactNumber,
      gender: result.gender,
      hasFullAuth: result.hasFullAuth,
      signature: result.signature,
    }));
    callback(result);
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  } finally {
    yield put(updateField({ submitting: false }));
  }
}

function* fetchCaptcha(action:AUTH_FETCH_CAPTCHA) {
  const { callback } = action.payload;
  try {
    const url = `${Network.AUTH_URL}/verifyImg`;
    const result = yield call([Utils.Api, Utils.Api.get], url);
    callback(result);
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  }
}

function* sendSMS(action:AUTH_SEND_SMS) {
  const { phone, captchaImgId, captcha, callback } = action.payload;
  try {
    const url = `${Network.AUTH_URL}/sms/web?type=loginbysms&phone=${phone}&imgId=${captchaImgId}&verifyCode=${captcha}`;
    yield call([Utils.Api, Utils.Api.post], url);
    callback('ok');
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
    callback('error');
  }
}

function* registerSubmit(action:AUTH_REGISTER_SUBMIT) {
  const { phone, smsCode, callback } = action.payload;
  try {
    // const url = `${Network.AUTH_URL}sms/web?type=loginbysms&phone=${phone}&imgId=${captchaImgId}&verifyCode=${captcha}`;
    // const body = {
    //   type: 'loginBySMS',
    //   phone,
    // };
    //
    // yield call([Utils.Api, Utils.Api.post], url, body);
    yield callback('ok');
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
    callback('error');
  }
}

function* logout(action:AUTH_LOGOUT) {
  const { callback } = action.payload;
  try {
    // const url = `${Network.AUTH_URL}/logout`;
    // yield call([Utils.Api, Utils.Api.post], url);

    yield put(clearUser());

    const { user } = yield select((state) => {
      return {
        user: { ...state.user },
      };
    });

    Utils.storage.setUser(user);
    callback();
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  }
}


function* index() {
  yield [
    takeEvery(AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE, accountSubmit),
    takeEvery(AUTH_MOBILE_SUBMIT_SERVICE_TYPE, mobileSubmit),
    takeEvery(AUTH_SEND_SMS_SERVICE_TYPE, sendSMS),
    takeEvery(AUTH_FETCH_CAPTCHA_SERVICE_TYPE, fetchCaptcha),
    takeEvery(AUTH_REGISTER_SUBMIT_SERVICE_TYPE, registerSubmit),
    takeEvery(AUTH_LOGOUT_SERVICE_TYPE, logout),
  ];
}

export default index;
