// @flow
/**
 |--------------------------------------------------
 | action is used to define the interface of the services and reducer.
 |--------------------------------------------------
 */

// import state type defination from reducers
import type { REDUCER_STATE_TYPE } from '../reducers/app';

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
export const APP_UPDATE_FIELD_TYPE /* : APP_UPDATE_FIELD_TYPE */ = 'APP_UPDATE_FIELD_TYPE';

// service layer type
export const APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE /* : APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE */ = 'APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE';
export const APP_FETCH_NOTICES_SERVICE_TYPE /* : APP_FETCH_NOTICES_SERVICE_TYPE */ = 'APP_FETCH_NOTICES_SERVICE_TYPE';
export const APP_CLEAR_NOTICES_SERVICE_TYPE /* : APP_CLEAR_NOTICES_SERVICE_TYPE */ = 'APP_CLEAR_NOTICES_SERVICE_TYPE';

/**
 |--------------------------------------------------
 | DEFINE ACTION OBJECT TYPE
 | FORMAT:
 | for reducer action [FILENAME]_[ACTION]
 | for service action [FILENAME]_[ACTION]_SERVICE
 |--------------------------------------------------
 */

export type APP_UPDATE_FIELD = {
  type: APP_UPDATE_FIELD_TYPE,
  payload: REDUCER_STATE_TYPE,
}

export type APP_CHANGE_LAYOUT_COLLAPSED = {
  type: APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE,
  payload: {
    collapsed: boolean
  }
}

export type APP_FETCH_NOTICES = {
  type: APP_FETCH_NOTICES_SERVICE_TYPE,
}

export type APP_CLEAR_NOTICES = {
  type: APP_CLEAR_NOTICES_SERVICE_TYPE,
  payload: {
    type: string
  }
}

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */
export function updateField(payload:REDUCER_STATE_TYPE): APP_UPDATE_FIELD {
  return {
    type: APP_UPDATE_FIELD_TYPE,
    payload,
  };
}

/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */
export function changeLayoutCollapsed(collapsed: boolean):APP_CHANGE_LAYOUT_COLLAPSED {
  return {
    type: APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE,
    payload: {
      collapsed,
    },
  };
}

export function fetchNotices():APP_FETCH_NOTICES {
  return {
    type: APP_FETCH_NOTICES_SERVICE_TYPE,
  };
}

export function clearNotices(type:string):APP_CLEAR_NOTICES {
  return {
    type: APP_CLEAR_NOTICES_SERVICE_TYPE,
    payload: {
      type,
    },
  };
}

// export all the action interface

