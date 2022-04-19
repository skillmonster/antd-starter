import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
export default function ProfileDropdown() {
  const { t } = useTranslation('navbar');
  function handleLogout() {
    // LocalStorageService.clearToken();
    // History.push('/login')
  }
  return (
    <Menu key="profileDropdown-list" mode="vertical">
      <Menu.Item key="profile">{t('profile')}</Menu.Item>
      <Menu.Item key="logout" danger onClick={handleLogout}>
        {t('logout')}
      </Menu.Item>
    </Menu>
  );
}
