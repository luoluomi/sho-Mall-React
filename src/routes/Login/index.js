import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/sign/login',
  title: 'Login',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export async function getUser(payload) {
  //获取用户信息接口
  return await Axios.get(`${libConfig.address}api/getUserMsg?uid=${payload.uid}`);
}
export default (app) => createRoute(app, routesConfig);
