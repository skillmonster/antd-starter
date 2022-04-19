import * as React from 'react';

import { useRoutes } from 'react-router-dom';
import { AdminTemplate } from '../../components/layout/AdminTemplate';

const Example = React.lazy(() => import('../../components/example/Example'));
export const AdminConfig = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: <AdminTemplate />,
      children: [
        { index: true, element: <Example /> },
        { path: '/example', element: <Example /> },
      ],
    },
  ]);
  return routes;
};
