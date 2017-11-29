// @flow
/**
 |--------------------------------------------------
 | IMPORT ACTION TYPE DEFINATION FROM ACTIONS
 |--------------------------------------------------
 */
import { AUTH_UPDATE_FIELD_TYPE } from '../actions/auth';
import type { AUTH_UPDATE_FIELD } from '../actions/auth';


/**
 |--------------------------------------------------
 | DEFINE REDUCER TYPE
 |--------------------------------------------------
 */
export type REDUCER_STATE_TYPE = {
  status: 'ok' | 'error' | '' | true | false | undefined,
  type: 'account' | 'mobile',
  submitting: boolean,
  remember: boolean,
}


/**
 |--------------------------------------------------
 | INIT REDUCER
 |--------------------------------------------------
 */
const initState: REDUCER_STATE_TYPE = {

};

/**
 |--------------------------------------------------
 | DEFINE REDUCER
 |--------------------------------------------------
 */
function auth(state:REDUCER_STATE_TYPE = initState, action:AUTH_UPDATE_FIELD): REDUCER_STATE_TYPE {
  const { type, payload } = action;
  if (type === AUTH_UPDATE_FIELD_TYPE) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}

export default auth;

