// @flow
import BaseConfig from '../../config/baseConfig';

/**
 |--------------------------------------------------
 | action is used to define the interface of the services and reducer.
 |--------------------------------------------------
 */

// import state type defination from reducers
import type { REDUCER_STATE_TYPE } from '../reducers/user';

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
export const USER_UPDATE_FIELD_TYPE /* : USER_UPDATE_FIELD_TYPE */ = 'USER_UPDATE_FIELD_TYPE';

// service layer type
export const USER_INIT_SERVICE_TYPE /* : USER_INIT_SERVICE_TYPE */ = 'USER_INIT_SERVICE_TYPE';
export const USER_UPDATE_SERVICE_TYPE /* : USER_UPDATE_SERVICE_TYPE */ = 'USER_UPDATE_SERVICE_TYPE';

/**
 |--------------------------------------------------
 | DEFINE ACTION OBJECT TYPE
 | FORMAT:
 | for reducer action [FILENAME]_[ACTION]
 | for service action [FILENAME]_[ACTION]_SERVICE
 |--------------------------------------------------
 */

export type USER_UPDATE_FIELD = {
  type: USER_UPDATE_FIELD_TYPE,
  payload: REDUCER_STATE_TYPE,
}

export type USER_UPDATE = {
  type: USER_UPDATE_SERVICE_TYPE,
  payload: REDUCER_STATE_TYPE,
}

export type USER_INIT = {
  type: USER_INIT_SERVICE_TYPE,
}

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */
export function updateField(payload:REDUCER_STATE_TYPE): USER_UPDATE_FIELD {
  return {
    type: USER_UPDATE_FIELD_TYPE,
    payload,
  };
}

export function clearUser() {
  return updateField(BaseConfig.defaultUser);
}

/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */

export function initUser(): USER_INIT {
  return {
    type: USER_INIT_SERVICE_TYPE,
  };
}

export function updateUser(payload: REDUCER_STATE_TYPE): USER_UPDATE {
  return {
    type: USER_UPDATE_SERVICE_TYPE,
    payload,
  };
}

// export all the action interface
