// @flow
import storage from '../../lib/storage';

/**
 |--------------------------------------------------
 | IMPORT ACTION TYPE DEFINATION FROM ACTIONS
 |--------------------------------------------------
 */
import { USER_UPDATE_FIELD_TYPE } from '../actions/user';
import type { USER_UPDATE_FIELD } from '../actions/user';

/**
 |--------------------------------------------------
 | DEFINE REDUCER TYPE
 |--------------------------------------------------
 */
export type REDUCER_STATE_TYPE = {
  id: string,
  Token: string,
  hasPassword: string,
  name: string,
  phone: string,
  photo: string,
  lng: string,
  lat: string,
  city: Array<string>,
  address: string,
  birthday: string,
  contactNumber: string,
  gender: string,
  hasFullAuth: boolean,
  signature: string,
  notifyCount: number,
}


/**
 |--------------------------------------------------
 | INIT REDUCER
 |--------------------------------------------------
 */
const initState: REDUCER_STATE_TYPE = {
  ...storage.getUser(),
};
/**
 |--------------------------------------------------
 | DEFINE REDUCER
 |--------------------------------------------------
 */
function app(state:REDUCER_STATE_TYPE = initState, action:USER_UPDATE_FIELD): REDUCER_STATE_TYPE {
  const { type, payload } = action;
  if (type === USER_UPDATE_FIELD_TYPE) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}

export default app;
