import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './Navbar';
import { Notification } from './Notification';
import { ModalDialog } from './ModalDialog';
import { SidebarMenu } from './SidebarMenu';
const { Content } = Layout;
export const AdminTemplate: React.FC = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Layout className="site-layout-height">
        <Suspense fallback={''}>
          <SidebarMenu collapsed={collapsed} />
        </Suspense>
        <Layout className="site-layout">
          <Suspense fallback={''}>
            <Navbar collapsed={collapsed} toggle={toggle} />
          </Suspense>
          <Suspense fallback={'loading...'}>
            <Content
              className="site-layout-background"
              style={{ margin: '24px 16px 0', overflow: 'initial' }}
            >
              <Notification />
              <ModalDialog />
              <Outlet />
            </Content>
          </Suspense>
        </Layout>
      </Layout>
    </>
  );
};
