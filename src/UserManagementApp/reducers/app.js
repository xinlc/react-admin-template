// @flow
/**
 |--------------------------------------------------
 | IMPORT ACTION TYPE DEFINATION FROM ACTIONS
 |--------------------------------------------------
 */
import { APP_UPDATE_FIELD_TYPE } from '../actions/app';
import type { APP_UPDATE_FIELD } from '../actions/app';

/**
 |--------------------------------------------------
 | DEFINE REDUCER TYPE
 |--------------------------------------------------
 */
type NOTICE = {
  id: string,
  type: string,
  title: string,
  avatar: string,
  datetime: string,
};

export type REDUCER_STATE_TYPE = {
  collapsed: boolean,
  notices: Array<NOTICE>,
  fetchingNotices: boolean,
}


/**
 |--------------------------------------------------
 | INIT REDUCER
 |--------------------------------------------------
 */
const initState: REDUCER_STATE_TYPE = {
  collapsed: false,
  notices: [],
  fetchingNotices: false,
};

/**
 |--------------------------------------------------
 | DEFINE REDUCER
 |--------------------------------------------------
 */
function app(state:REDUCER_STATE_TYPE = initState, action:APP_UPDATE_FIELD): REDUCER_STATE_TYPE {
  const { type, payload } = action;
  if (type === APP_UPDATE_FIELD_TYPE) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}

export default app;

