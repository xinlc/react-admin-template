// @flow
/**
 |--------------------------------------------------
 | action is used to define the interface of the services and reducer.
 |--------------------------------------------------
 */

// import state type defination from reducers
import type { REDUCER_STATE_TYPE } from '../reducers/auth';

/**
 |--------------------------------------------------
 | DEFINE ACTION TYPE
 | this will be reused in the reducer and service
 | FORMAT:
 | for reducer action [FILENAME]_[ACTION]_TYPE
 | for service action [FILENAME]_[ACTION]_SERVICE_TYPE
 |--------------------------------------------------
 */

// redux reducer type
export const AUTH_UPDATE_FIELD_TYPE /* : APP_UPDATE_FIELD_TYPE */ = 'APP_UPDATE_FIELD_TYPE';

// service layer type
export const AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE /* : AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE */ = 'AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE';
export const AUTH_MOBILE_SUBMIT_SERVICE_TYPE /* : AUTH_MOBILE_SUBMIT_SERVICE_TYPE */ = 'AUTH_MOBILE_SUBMIT_SERVICE_TYPE';
export const AUTH_FETCH_CAPTCHA_SERVICE_TYPE /* : AUTH_FETCH_CAPTCHA_SERVICE_TYPE */ = 'AUTH_FETCH_CAPTCHA_SERVICE_TYPE';
export const AUTH_SEND_SMS_SERVICE_TYPE /* : AUTH_SEND_SMS_SERVICE_TYPE */ = 'AUTH_SEND_SMS_SERVICE_TYPE';
export const AUTH_LOGOUT_SERVICE_TYPE /* : AUTH_LOGOUT_SERVICE_TYPE */ = 'AUTH_LOGOUT_SERVICE_TYPE';
export const AUTH_REGISTER_SUBMIT_SERVICE_TYPE /* : AUTH_REGISTER_SUBMIT_SERVICE_TYPE */ = 'AUTH_REGISTER_SUBMIT_SERVICE_TYPE';


/**
 |--------------------------------------------------
 | DEFINE ACTION OBJECT TYPE
 | FORMAT:
 | for reducer action [FILENAME]_[ACTION]
 | for service action [FILENAME]_[ACTION]_SERVICE
 |--------------------------------------------------
 */
export type AUTH_UPDATE_FIELD = {
  type: AUTH_UPDATE_FIELD_TYPE,
  payload: REDUCER_STATE_TYPE,
}

export type AUTH_ACCOUNT_SUBMIT = {
  type: AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE,
  payload: {
    userName: string,
    password: string,
    captchaImgId: string,
    captcha: string,
    callback: (...any) => void,
  }
}

export type AUTH_MOBILE_SUBMIT = {
  type: AUTH_MOBILE_SUBMIT_SERVICE_TYPE,
  payload: {
    phone: string,
    smsCode: string,
    callback: (...any) => void,
  }
}

export type AUTH_FETCH_CAPTCHA = {
  type: AUTH_FETCH_CAPTCHA_SERVICE_TYPE,
  payload: {
    callback: (...any) => void,
  }
}

export type AUTH_SEND_SMS = {
  type: AUTH_SEND_SMS_SERVICE_TYPE,
  payload: {
    phone: string,
    captchaImgId: string,
    captcha: string,
    callback: (...any) => void,
  }
}

export type AUTH_LOGOUT = {
  type: AUTH_LOGOUT_SERVICE_TYPE,
  payload: {
    callback: (...any) => void,
  }
}

export type AUTH_REGISTER_SUBMIT = {
  type: AUTH_REGISTER_SUBMIT_SERVICE_TYPE,
  payload: {
    phone: string,
    smsCode: string,
    callback: (...any) => void,
  }
}

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */
export function updateField(payload:REDUCER_STATE_TYPE): AUTH_UPDATE_FIELD {
  return {
    type: AUTH_UPDATE_FIELD_TYPE,
    payload,
  };
}


/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */
export function accountSubmit(userName: string, password: string, captchaImgId: string,
  captcha: string,
  callback: (...any) => void)
  :AUTH_ACCOUNT_SUBMIT {
  return {
    type: AUTH_ACCOUNT_SUBMIT_SERVICE_TYPE,
    payload: {
      userName,
      password,
      captchaImgId,
      captcha,
      callback,
    },
  };
}

export function mobileSubmit(phone: string, smsCode: string, callback: (...any) => void)
  :AUTH_MOBILE_SUBMIT {
  return {
    type: AUTH_MOBILE_SUBMIT_SERVICE_TYPE,
    payload: {
      phone,
      smsCode,
      callback,
    },
  };
}

export function fetchCaptcha(callback: (...any) => void):AUTH_FETCH_CAPTCHA {
  return {
    type: AUTH_FETCH_CAPTCHA_SERVICE_TYPE,
    payload: {
      callback,
    },
  };
}

export function sendSMS(phone: string, captchaImgId: string, captcha: string,
  callback: (...any) => void):AUTH_SEND_SMS {
  return {
    type: AUTH_SEND_SMS_SERVICE_TYPE,
    payload: {
      phone,
      captchaImgId,
      captcha,
      callback,
    },
  };
}

export function registerSubmit(phone: string, smsCode: string, callback: (...any) => void)
  :AUTH_REGISTER_SUBMIT {
  return {
    type: AUTH_REGISTER_SUBMIT_SERVICE_TYPE,
    payload: {
      phone,
      smsCode,
      callback,
    },
  };
}

export function logout(callback: (...any) => void):AUTH_LOGOUT {
  return {
    type: AUTH_LOGOUT_SERVICE_TYPE,
    payload: {
      callback,
    },
  };
}

// export all the action interface

