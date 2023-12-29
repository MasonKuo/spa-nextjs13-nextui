import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import KeepAlive from 'react-activation';
import { routes } from './config';

//根据路径获取路由
const checkAuth = (routers: any, path: String) => {
  for (const data of routers) {
    if (data.path == path) return data;
    if (data.children) {
      const res: any = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};

// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children);
    }
    if (item.component) {
      item.element = (
        <KeepAlive id={item.path} name={item.path}>
          <Suspense fallback={<div>Loading...</div>}>
            {/* 把懒加载的异步路由变成组件装载进去 */}
            <item.component />
          </Suspense>
        </KeepAlive>
      );
    }
    return item;
  });
};

const Router = () => useRoutes(generateRouter(routes));
const checkRouterAuth = (path: String) => {
  let auth = null;
  auth = checkAuth(routes, path);
  return auth;
};
export { Router, checkRouterAuth };
