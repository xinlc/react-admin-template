
import BasicLayout from '../UserManagementApp/containers/Layouts/BasicLayout';
import UserLayout from '../UserManagementApp/containers/Layouts/UserLayout';
import Dashboard from '../UserManagementApp/containers/Dashboard';
import UserLogin from '../UserManagementApp/containers/Auth/Login';
import UserRegister from '../UserManagementApp/containers/Auth/Register';
import RegisterResult from '../UserManagementApp/containers/Auth/RegisterResult';
import ResultSuccess from '../UserManagementApp/containers/Result/Success';
import ResultError from '../UserManagementApp/containers/Result/Error';
import Exception403 from '../UserManagementApp/containers/Exception/403';
import Exception404 from '../UserManagementApp/containers/Exception/404';
import Exception500 from '../UserManagementApp/containers/Exception/500';

// nav data
export const getNavData = () => [
  {
    component: BasicLayout,
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '首页',
            path: 'home',
            component: Dashboard,
          },
        ],
      },
      {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: '成功',
            path: 'success',
            component: ResultSuccess,
          },
          {
            name: '失败',
            path: 'fail',
            component: ResultError,
          },
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: Exception403,
          },
          {
            name: '404',
            path: '404',
            component: Exception404,
          },
          {
            name: '500',
            path: '500',
            component: Exception500,
          },
        ],
      },
    ],
  },
  {
    component: UserLayout,
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: UserLogin,
          },
          {
            name: '注册',
            path: 'register',
            component: UserRegister,
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: RegisterResult,
          },
        ],
      },
    ],
  },
];
