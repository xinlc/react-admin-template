import React from 'react';
import { Route, Switch } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './nav';
import Utils from '../lib/utils';

// dynamic.setDefaultLoadingComponent(() => {
//   return <Spin size="large" className={styles.globalSpin} />;
// });

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = Utils.getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

function getRouterConfig() {
  const navData = getNavData();
  const UserLayout = getLayout(navData, 'UserLayout').component;
  const BasicLayout = getLayout(navData, 'BasicLayout').component;

  const passProps = {
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };

  const routes = (
    <Switch>
      <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
      <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
    </Switch>
  );

  return routes;
}

const routerConfig = getRouterConfig();

export default routerConfig;

