import { AxiosResponse } from 'axios';
import { put, take } from 'redux-saga/effects';
import {
  handleError,
  handleModalDialog,
  handleModalNotification,
  handleSuccess,
} from './utility/action';
import { ISuccess, ModalDialogIcon } from './utility/types';

export function* subscribeSuccessMessage(chan: any) {
  const payload = (yield take(chan)) as ISuccess;
  yield put(
    handleModalNotification({
      type: 'OPEN_NOTIFICATION',
      payload: { icon: 'success', message: 'operation_successfully' },
    })
  );
  yield put(
    handleSuccess({
      type: 'SET_SUCCESS',
      payload: payload,
    })
  );
}

export function* subscribeErrorMessage(chan: any) {
  const res = (yield take(chan)) as AxiosResponse;
  yield put(
    handleError({
      type: 'SET_ERROR',
      payload: { name: 'ADD_COMPANY', status: true },
    })
  );
  let description = '';
  let icon: ModalDialogIcon = 'info';
  switch (res.status) {
    case 404:
      icon = 'warning';
      description = 'item_not_found';
      break;
    case 500:
      icon = 'error';
      description = 'operation_failed';
      break;
    default:
      icon = 'warning';
      description = res.data.code;
      break;
  }
  yield put(
    handleModalDialog({
      type: 'OPEN_MODAL_DIALOG',
      payload: {
        icon: icon,
        message: 'warning_message',
        description: description,
      },
    })
  );
}
