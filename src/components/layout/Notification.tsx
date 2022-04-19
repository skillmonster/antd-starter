import { notification } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { NotificationState } from '../../store/utility';

export const Notification: React.FC = () => {
  const { t } = useTranslation('notification');
  const showNoti = useSelector<AppState, NotificationState>(
    ({ notification }) => notification
  );
  React.useEffect(() => {
    if (showNoti.show) {
      notification[showNoti.data.icon]({
        message: showNoti.data.message ? t(showNoti.data.message) : '',
        description: showNoti.data.description
          ? t(showNoti.data.description)
          : '',
        duration: 2,
      });
    }
  }, [showNoti, t]);
  return <></>;
};
