import * as React from 'react';
import { Image, Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { navigator } from '../../config/navigation';
import { NavbarMenu } from './NavabarMenu';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
interface Props {
  collapsed: boolean;
}
export const SidebarMenu: React.FC<Props> = (prop) => {
  const { pathname } = useLocation();
  return (
    <Sider
      width={200}
      collapsible
      collapsed={prop.collapsed}
      collapsedWidth={45}
      trigger={null}
      className="sidebar"
      breakpoint="lg"
    >
      <div className="logo">
        <Link to="/">
          <Image
            src={`${process.env.PUBLIC_URL}/logo512.png`}
            preview={false}
          />
        </Link>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        selectedKeys={[pathname]}
        style={{ height: '100%', borderRight: 0 }}
      >
        {navigator.map((i, index) => {
          return (
            <React.Fragment key={index + 1}>{NavbarMenu(i)}</React.Fragment>
          );
        })}
      </Menu>
    </Sider>
  );
};
