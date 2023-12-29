import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    auth: false,
    component: lazy(() => import('src/custom_pages/index')),
  },
  {
    path: '/portal',
    auth: false,
    component: lazy(() => import('src/custom_pages/portal')),
    //   children: [
    //     {
    //       path: '/Portal/Home',
    //       auth:true,
    //       component:lazy(() => import('../page/home/Home'))
    //     },
    //     { path: '/Portal/Test',
    //       auth:true,
    //       component:lazy(() => import('../page/test/Test'))
    //     },
    //     {
    //       path: '/Portal/*',
    //       auth:false,
    //       component:lazy(() => import('../page/error/NotFound'))
    //     }
    //   ]
  },
  {
    path: '/features',
    auth: false,
    component: lazy(() => import('src/custom_pages/features')),
  },
  {
    path: '*',
    auth: false,
    component: lazy(() => import('src/custom_pages/error')),
  },
  {
    path: '/redirect',
    auth: false,
    component: lazy(() => import('src/custom_pages/redirect')),
  },
];
