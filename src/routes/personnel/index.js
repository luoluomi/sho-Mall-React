import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
  path: '/personnel',
  title: '人员管理',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  exact: true
});

export default (app) => createRoute(app, routesConfig);
