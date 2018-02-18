import {App, Home, NotFound} from '../components';

export const routes = [
  {
    component: App,
    path: '/',
    routes: [
      {
        exact: true,
        path: '/home',
        component: Home,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
