
import { put, takeEvery, select } from 'redux-saga/effects';
import { Modal } from 'antd';
import {
  updateField,
  APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE,
  APP_FETCH_NOTICES_SERVICE_TYPE,
  APP_CLEAR_NOTICES_SERVICE_TYPE,
} from '../actions/app';

import type {
  APP_CHANGE_LAYOUT_COLLAPSED,
  APP_CLEAR_NOTICES,
} from '../actions/app';

function* changeLayoutCollapsed(action:APP_CHANGE_LAYOUT_COLLAPSED) {
  const { collapsed } = action.payload;
  try {
    yield put(updateField({
      collapsed,
    }));
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  }
}

function* fetchNotices() {
  try {
    yield put(updateField({
      fetchingNotices: true,
    }));

    // TODO: fetch data...
    const aa = {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      datetime: '2017-08-07',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      id: '000000007',
      title: '朱偏右 回复了你',
      type: '消息',
    };
    const data = [aa]; // yield call(queryNotices);

    yield put(updateField({
      notices: data,
      fetchingNotices: false,
    }));
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  }
}

function* clearNotices(action:APP_CLEAR_NOTICES) {
  const { type } = action.payload;
  try {
    const { notices } = yield select((state) => {
      return {
        notices: state.app.notices,
      };
    });
    const count = notices.length;

    // yield put({
    //   type: 'user/changeNotifyCount',
    //   payload: count,
    // });

    yield put(updateField({
      notices: notices.filter(item => item.type !== type),
    }));
  } catch (e) {
    Modal.error({
      content: e.msg,
    });
  }
}

function* index() {
  yield [
    takeEvery(APP_CHANGE_LAYOUT_COLLAPSED_SERVICE_TYPE, changeLayoutCollapsed),
    takeEvery(APP_FETCH_NOTICES_SERVICE_TYPE, fetchNotices),
    takeEvery(APP_CLEAR_NOTICES_SERVICE_TYPE, clearNotices),
  ];
}

export default index;
