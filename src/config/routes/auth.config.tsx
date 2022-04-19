import {  useRoutes } from 'react-router-dom';
import Login from '../../components/auth/Login';

export const AuthConfig = () => {
  let routes = useRoutes([
    {
      path: '/login',
      element: <Login/>
    }
  ])
  return routes
}