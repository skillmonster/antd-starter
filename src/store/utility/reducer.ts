import { Reducer } from 'redux';
import {
  ErrorState,
  Action,
  SuccessState,
  ModalDialogState,
  ActionSuccess,
  ActionModalDialog,
  NotificationState,
  ActionNotification,
  ModalState,
  ActionModal,
} from './types';

const initialState = {
  status: false,
  name: '',
};
export const reducer: Reducer<ErrorState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const initialSuccessState = {
  status: false,
  name: '',
};
export const successReducer: Reducer<SuccessState, ActionSuccess> = (
  state = initialSuccessState,
  action
) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const initialModalDialogState: ModalDialogState = {
  show: false,
  data: {
    icon: 'success',
    message: 'message',
    description: 'description',
  },
};
export const modalDialogReducer: Reducer<
  ModalDialogState,
  ActionModalDialog
> = (state = initialModalDialogState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL_DIALOG':
      return { ...state, show: true, data: { ...action.payload } };
    case 'CLOSE_MODAL_DIALOG':
      return { ...state, show: false, initialModalDialogState };
    default:
      return state;
  }
};

export const initialNotificationState: NotificationState = {
  show: false,
  data: {
    icon: 'success',
    message: 'message',
    description: 'description',
  },
};

export const notificationReducer: Reducer<
  NotificationState,
  ActionNotification
> = (state = initialNotificationState, action) => {
  switch (action.type) {
    case 'OPEN_NOTIFICATION':
      return { ...state, show: true, data: { ...action.payload } };
    default:
      return state;
  }
};

export const initialModalState: ModalState<any> = {
  modal_name: '',
  open: false,
};

export const modalReducer: Reducer<ModalState<any>, ActionModal> = (
  state = initialModalState,
  action
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        open: true,
        modal_name: action.payload.modal_name,
        data: action.payload.data,
      };
    case 'CLOSE_MODAL':
      return { ...state, open: false, data: { ...initialModalState } };
    default:
      return state;
  }
};
