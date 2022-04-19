import { Modal } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { ModalDialogState } from '../../store/utility';
import { handleModalDialog } from '../../store/utility/action';
import { initialModalDialogState } from '../../store/utility/reducer';

export const ModalDialog: React.FC = (props) => {
  const { t } = useTranslation('notification');
  const dispatch = useDispatch();
  const showModalDialog = useSelector<AppState, ModalDialogState>(
    ({ modal_dialog }) => modal_dialog
  );
  React.useEffect(() => {
    if (showModalDialog.show) {
      Modal[showModalDialog.data.icon]({
        title: t(showModalDialog.data.message),
        content: showModalDialog.data.description
          ? t(showModalDialog.data.description)
          : '',
        onOk() {
          dispatch(
            handleModalDialog({
              type: 'CLOSE_MODAL_DIALOG',
              payload: initialModalDialogState.data,
            })
          );
        },
      });
    }
  }, [showModalDialog, dispatch, t]);
  return <></>;
};
