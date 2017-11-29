import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/zh-cn';
import './index.less';
import './rollbar';

import UserManagementApp from './UserManagementApp/index';
// import TestApp from './TestApp/index';


// Render the main component into the dom
ReactDOM.render(
  <div style={{ width: '100%', height: '100%' }}>
    <UserManagementApp />
    {/* <TestApp /> */}
  </div>,
  document.getElementById('root')
);

