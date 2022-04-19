import { Menu } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavLink } from './../../config/navigation';
const { SubMenu } = Menu;
export const NavbarMenu = (
  nav: NavLink
  // permission: AuthPermission | undefined
): JSX.Element => {
  const { t } = useTranslation('navbar');
  const showMenu = (menu: NavLink) => {
    const { name, link, label, item, icon } = menu;
    // if (permission) {
    // if (name in permission || '*' in permission) {
    if (!item && link) {
      return (
        <Menu.Item icon={icon} key={name}>
          <Link to={link}>{t(label)}</Link>
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu key={name} title={t(label)} icon={icon}>
          {item?.map((i, index) => {
            return <Fragment key={index + 1}>{NavbarMenu(i)}</Fragment>;
          })}
        </SubMenu>
      );
    }
  };
  return <>{showMenu(nav)}</>;
};
