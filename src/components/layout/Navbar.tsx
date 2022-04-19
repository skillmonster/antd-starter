import React, { useState } from 'react';
import { Col, Layout, Menu, message, Row, Switch } from 'antd';
import { useLocation } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import Avatar from 'antd/lib/avatar/avatar';
import ProfileDropdown from './ProfileDropdown';
import {
  GlobalOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import ChangeLanguage from './ChangeLanguage';
import darkVars from './../../dark.json';
import lightVars from './../../light.json';
import { useTranslation } from 'react-i18next';
const { Header } = Layout;
interface Props {
  collapsed: boolean;
  toggle: () => void;
}
const Navbar: React.FC<Props> = (props) => {
  const { t } = useTranslation('navbar');
  const { pathname } = useLocation();
  let themeName = localStorage.getItem('theme-name') || 'light';
  const [switchThemeValue, setSwitchThemeValue] = useState<boolean>(
    themeName === 'light' ? false : true
  );
  let initialValue = lightVars;
  let vars: any = {};
  try {
    vars = localStorage.getItem('app-theme');
    if (!vars) {
      vars = initialValue;
    } else {
      vars = Object.assign({}, JSON.parse(vars));
    }
  } catch (e) {
    vars = initialValue;
  } finally {
    window.less
      .modifyVars(vars)
      .then(() => {
        // setThemeApplied(true);
      })
      .catch((error: any) => {
        message.error(`Failed to update theme`);
      });
  }
  const switchTheme = (value: string) => {
    if (value === 'light') {
      setSwitchThemeValue(false);
    } else {
      setSwitchThemeValue(true);
    }
    let vars: any = value === 'light' ? lightVars : darkVars;
    vars = { ...vars, '@white': '#fff', '@black': '#000' };
    localStorage.setItem('app-theme', JSON.stringify(vars));
    localStorage.setItem('theme-name', value);
    window.less.modifyVars(vars).catch((error: any) => {});
  };
  return (
    <>
      <Header className="navbar">
        <Row justify="space-between">
          <Col>
            {React.createElement(
              props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: props.toggle,
              }
            )}
          </Col>
          <Col flex={1}>
            <Menu mode="horizontal" selectedKeys={[pathname]}>
              <SubMenu
                key="profileSubMenu"
                style={{ marginLeft: 'auto' }}
                title={
                  <>
                    <Avatar
                      shape="circle"
                      size="small"
                      icon={<UserOutlined />}
                      style={{ marginInline: '5px', padding: '0 5px' }}
                    />
                    {`Vanvixay Thammavong`}
                  </>
                }
              >
                <ProfileDropdown />
              </SubMenu>
              <SubMenu
                key="changeLanguageSubMenu"
                title={<GlobalOutlined style={{ fontSize: 20 }} />}
              >
                <ChangeLanguage />
              </SubMenu>
              <Menu.Item key="switchTheme">
                <Switch
                  checkedChildren={t('dark')}
                  unCheckedChildren={t('light')}
                  onChange={() =>
                    switchTheme(!switchThemeValue ? 'dark' : 'light')
                  }
                  defaultChecked={themeName === 'light' ? false : true}
                />
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    </>
  );
};
export default Navbar;
