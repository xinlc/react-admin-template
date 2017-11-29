import { fork } from 'redux-saga/effects';

import App from './app';
import Auth from './auth';
import User from './user';

function* index() {
  yield [
    fork(App),
    fork(Auth),
    fork(User),
  ];
}

export default index;
