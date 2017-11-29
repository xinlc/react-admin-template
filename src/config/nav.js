
import dynamic from '../lib/dynamic';

// wrapper of dynamic
const dynamicWrapper = component => dynamic({ component });

// nav data
export const getNavData = () => [
  {
    component: dynamicWrapper(() => import('../UserManagementApp/containers/Layouts/BasicLayout')),
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
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Dashboard')),
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
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Result/Success')),
          },
          {
            name: '失败',
            path: 'fail',
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Result/Error')),
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
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Exception/500')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(() => import('../UserManagementApp/containers/Layouts/UserLayout.js')),
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
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Auth/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Auth/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(() => import('../UserManagementApp/containers/Auth/RegisterResult')),
          },
        ],
      },
    ],
  },
];
