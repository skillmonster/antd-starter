import React from 'react';
import { Link,Outlet } from 'react-router-dom';
export const Layout = () => {
  return (
    <>
      <Link to={"/not-found"}>Click To Login</Link>
      <Outlet/>
    </>
  );
};
